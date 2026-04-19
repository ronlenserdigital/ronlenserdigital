using System;

namespace CommandOptionsApp
{
    class Program
    {
        static void Main(string[] args)
        {
            // Index/Overview
            Console.WriteLine("======= Command Options App =======");
            Console.WriteLine("Available Commands:");
            Console.WriteLine("  Option A - Insert informative paragraph template");
            Console.WriteLine("  Option B - Insert letter template");
            Console.WriteLine("  Option C - Insert email template");
            Console.WriteLine("-----------------------------------");
            Console.Write("Type a command (Option A/B/C): ");

            string input = Console.ReadLine();

            switch (input.Trim())
            {
                case "Option A":
                    Console.WriteLine("\nInformative paragraph template:\n\"In recent developments, it has been observed that...\"");
                    break;
                case "Option B":
                    Console.WriteLine("\nLetter template:\n\"Dear [Recipient],\nI hope this letter finds you well. I am writing to...\"");
                    break;
                case "Option C":
                    Console.WriteLine("\nEmail template:\n\"Hello [Name],\nI wanted to reach out regarding...\"");
                    break;
                default:
                    Console.WriteLine("\nUnrecognized command. Please input Option A, Option B, or Option C.");
                    break;
            }

            Console.WriteLine("\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}
