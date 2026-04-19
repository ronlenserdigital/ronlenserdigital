using Gma.System.MouseKeyHook;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Forms = System.Windows.Forms;
using Media = System.Windows.Media;
using System.Management;
using System.Windows.Threading;

namespace InstaBuild
{
    public partial class MainWindow : Window
    {
        private IKeyboardMouseEvents? _globalHook;
        private readonly List<Trigger> _triggers = new();
        private readonly DispatcherTimer _statsTimer;

        public MainWindow()
        {
            InitializeComponent();
            PopulateCombos();

            // Default selections
            SetCombo(Combo1, TriggerSpec.Key(Key.F));
            SetCombo(Combo2, TriggerSpec.Key(Key.G));
            SetCombo(Combo3, TriggerSpec.Mouse(MacroMouseTrigger.XButton1));
            SetCombo(Combo4, TriggerSpec.Mouse(MacroMouseTrigger.XButton2));

            // Dashboard stats timer
            _statsTimer = new DispatcherTimer { Interval = TimeSpan.FromSeconds(1) };
            _statsTimer.Tick += (_, __) => RefreshStats();
            _statsTimer.Start();
        }

        // ===== Navigation =====
        private void NavList_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (NavList.SelectedItem is not ListBoxItem item) return;
            string tab = item.Content?.ToString() ?? "";

            DashboardView.Visibility = (tab == "Dashboard") ? Visibility.Visible : Visibility.Collapsed;
            MacrosView.Visibility    = (tab == "Macros")    ? Visibility.Visible : Visibility.Collapsed;
            AnalyticsView.Visibility = (tab == "Analytics") ? Visibility.Visible : Visibility.Collapsed;
            SettingsView.Visibility  = (tab == "Settings")  ? Visibility.Visible : Visibility.Collapsed;
            InfoView.Visibility      = (tab == "Info")      ? Visibility.Visible : Visibility.Collapsed;
            NetworkView.Visibility   = (tab == "Network")   ? Visibility.Visible : Visibility.Collapsed;
        }

        // ===== Title bar =====
        private void TitleBar_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left) DragMove();
        }
        private void MinBtn_Click(object sender, RoutedEventArgs e) => WindowState = WindowState.Minimized;
        private void MaxBtn_Click(object sender, RoutedEventArgs e) =>
            WindowState = (WindowState == WindowState.Maximized) ? WindowState.Normal : WindowState.Maximized;
        private void CloseBtn_Click(object sender, RoutedEventArgs e) => Close();

        // ===== Macros =====
        private void PopulateCombos()
        {
            var all = TriggerSpec.AllOptions().ToList();
            foreach (var cb in new[] { Combo1, Combo2, Combo3, Combo4 })
            {
                cb.ItemsSource = all;
                cb.DisplayMemberPath = "Label";
                cb.SelectedValuePath = "Value";
                cb.Foreground = (Media.Brush)FindResource("TextBrush");
                cb.Background = (Media.Brush)FindResource("PanelBrush");
            }
        }

        private static TriggerSpec? FindSpec(ComboBox cb, TriggerSpec spec)
            => ((IEnumerable<TriggerSpec>)cb.ItemsSource).FirstOrDefault(x => x.Value == spec.Value);

        private void SetCombo(ComboBox cb, TriggerSpec spec)
        {
            var match = FindSpec(cb, spec);
            if (match != null) cb.SelectedItem = match;
        }

        private void StartBtn_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                _triggers.Clear();
                foreach (var cb in new[] { Combo1, Combo2, Combo3, Combo4 })
                    if (cb.SelectedItem is TriggerSpec spec && !spec.IsNone)
                        _triggers.Add(spec.ToTrigger());

                if (_triggers.Count == 0)
                {
                    MessageBox.Show("Please select at least one trigger.", "InstaBuild",
                        MessageBoxButton.OK, MessageBoxImage.Information);
                    return;
                }

                _globalHook = Hook.GlobalEvents();
                _globalHook.KeyDown += GlobalHook_KeyDown;
                _globalHook.MouseDownExt += GlobalHook_MouseDownExt;

                StartBtn.IsEnabled = false;
                StopBtn.IsEnabled = true;
                StatusText.Text = "Status: Activated";
                StatusTextDash.Text = "Activated";
                StatusTextDash.Foreground = (Media.Brush)FindResource("AccentBrush");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to start: " + ex.Message);
            }
        }

        private void StopBtn_Click(object sender, RoutedEventArgs e) => StopHook();

        private void StopHook()
        {
            if (_globalHook != null)
            {
                _globalHook.KeyDown -= GlobalHook_KeyDown;
                _globalHook.MouseDownExt -= GlobalHook_MouseDownExt;
                _globalHook.Dispose();
                _globalHook = null;
            }
            StartBtn.IsEnabled = true;
            StopBtn.IsEnabled = false;
            StatusText.Text = "Status: Deactivated";
            StatusTextDash.Text = "Deactivated";
            StatusTextDash.Foreground = (Media.Brush)FindResource("DangerBrush");
        }

        // ===== Hooks =====
        private void GlobalHook_KeyDown(object? sender, Forms.KeyEventArgs e)
        {
            foreach (var t in _triggers)
                if (t.Kind == TriggerKind.Keyboard && t.Key == e.KeyCode) { LeftClickNow(); break; }
        }

        private void GlobalHook_MouseDownExt(object? sender, Gma.System.MouseKeyHook.MouseEventExtArgs e)
        {
            foreach (var t in _triggers)
                if (t.Kind == TriggerKind.Mouse && MouseMatches(t.Mouse, e)) { LeftClickNow(); break; }
        }

        private static bool MouseMatches(MacroMouseTrigger trig, Forms.MouseEventArgs e)
        {
            return (trig == MacroMouseTrigger.Left   && e.Button == Forms.MouseButtons.Left)   ||
                   (trig == MacroMouseTrigger.Right  && e.Button == Forms.MouseButtons.Right)  ||
                   (trig == MacroMouseTrigger.Middle && e.Button == Forms.MouseButtons.Middle) ||
                   (trig == MacroMouseTrigger.XButton1 && e.Button == Forms.MouseButtons.XButton1) ||
                   (trig == MacroMouseTrigger.XButton2 && e.Button == Forms.MouseButtons.XButton2);
        }

        // ===== SendInput left click =====
        private static void LeftClickNow()
        {
            INPUT[] inputs = new INPUT[2];
            inputs[0] = new INPUT { type = 0, U = new InputUnion { mi = new MOUSEINPUT { dwFlags = MOUSEEVENTF.LEFTDOWN } } };
            inputs[1] = new INPUT { type = 0, U = new InputUnion { mi = new MOUSEINPUT { dwFlags = MOUSEEVENTF.LEFTUP } } };
            SendInput((uint)inputs.Length, inputs, Marshal.SizeOf(typeof(INPUT)));
        }

        [StructLayout(LayoutKind.Sequential)] struct INPUT { public uint type; public InputUnion U; }
        [StructLayout(LayoutKind.Explicit)] struct InputUnion { [FieldOffset(0)] public MOUSEINPUT mi; }
        [StructLayout(LayoutKind.Sequential)]
        struct MOUSEINPUT { public int dx; public int dy; public uint mouseData; public MOUSEEVENTF dwFlags; public uint time; public IntPtr dwExtraInfo; }
        [Flags] enum MOUSEEVENTF : uint { MOVE = 0x0001, LEFTDOWN = 0x0002, LEFTUP = 0x0004, RIGHTDOWN = 0x0008, RIGHTUP = 0x0010, MIDDLEDOWN = 0x0020, MIDDLEUP = 0x0040, XDOWN = 0x0080, XUP = 0x0100, WHEEL = 0x0800, HWHEEL = 0x1000, ABSOLUTE = 0x8000 }
        [DllImport("user32.dll", SetLastError = true)] static extern uint SendInput(uint nInputs, INPUT[] pInputs, int cbSize);

        protected override void OnClosed(EventArgs e) { base.OnClosed(e); StopHook(); }

        // ===== Dashboard stats =====
        private void RefreshStats()
        {
            try
            {
                var cpu = SysStats.GetCpuLoadPercent();
                CpuText.Text = $"{cpu:0}%";

                var (total, free) = SysStats.GetMemory();
                var usedPct = total == 0 ? 0 : (100.0 * (total - free) / total);
                RamText.Text = $"{usedPct:0}%";
            }
            catch
            {
                // transient WMI errors are ok
            }
        }
    }

    // ===== Trigger model =====
    enum TriggerKind { Keyboard, Mouse }

    // Renamed to avoid collisions with any other MouseTrigger in your project
    enum MacroMouseTrigger { Left, Right, Middle, XButton1, XButton2 }

    sealed record Trigger(TriggerKind Kind, Forms.Keys? Key = null, MacroMouseTrigger? Mouse = null);

    sealed class TriggerSpec
    {
        public string Label { get; init; }
        public string Value { get; init; }
        public bool IsNone { get; init; }

        private TriggerSpec(string label, string value, bool none = false) { Label = label; Value = value; IsNone = none; }

        public Trigger ToTrigger()
        {
            if (IsNone) throw new InvalidOperationException("None is not a trigger.");
            if (Value.StartsWith("K:"))
            {
                var keyName = Value.Substring(2);
                var winFormsKey = (Forms.Keys)Enum.Parse(typeof(Forms.Keys), keyName);
                return new Trigger(TriggerKind.Keyboard, Key: winFormsKey);
            }
            var mouseName = Value.Substring(2);
            var mt = (MacroMouseTrigger)Enum.Parse(typeof(MacroMouseTrigger), mouseName);
            return new Trigger(TriggerKind.Mouse, Mouse: mt);
        }

        public static TriggerSpec None() => new("— None —", "N:None", true);
        public static TriggerSpec Key(Key k) => new($"Key: {k}", "K:" + MapToForms(k).ToString());
        public static TriggerSpec Mouse(MacroMouseTrigger m) => new($"Mouse: {m}", "M:" + m);

        public static IEnumerable<TriggerSpec> AllOptions()
        {
            yield return None();
            foreach (var k in Enum.GetValues(typeof(Key)).Cast<Key>().Where(k => k != Key.None))
                yield return Key(k);
            foreach (MacroMouseTrigger m in Enum.GetValues(typeof(MacroMouseTrigger)))
                yield return Mouse(m);
        }

        public static Forms.Keys MapToForms(Key wpfKey)
        {
            try { return (Forms.Keys)Enum.Parse(typeof(Forms.Keys), wpfKey.ToString(), true); }
            catch { return (Forms.Keys)KeyInterop.VirtualKeyFromKey(wpfKey); }
        }
    }

    // ===== System stats via WMI =====
    static class SysStats
    {
        public static (ulong Total, ulong Free) GetMemory()
        {
            using var mos = new ManagementObjectSearcher("SELECT TotalVisibleMemorySize, FreePhysicalMemory FROM Win32_OperatingSystem");
            var obj = mos.Get().Cast<ManagementObject>().First();
            ulong totalKb = (ulong)obj["TotalVisibleMemorySize"];
            ulong freeKb  = (ulong)obj["FreePhysicalMemory"];
            return (totalKb * 1024UL, freeKb * 1024UL);
        }

        public static float GetCpuLoadPercent()
        {
            using var mos = new ManagementObjectSearcher("SELECT LoadPercentage FROM Win32_Processor");
            var vals = mos.Get().Cast<ManagementObject>().Select(mo => Convert.ToSingle(mo["LoadPercentage"]));
            return vals.Any() ? vals.Average() : 0f;
        }
    }
}
