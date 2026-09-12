export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "code"; code: string; language?: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string };

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  blocks?: ArticleBlock[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "AI" | "Digital Life" | "Future of Work" | "Emerging Tech";
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  accent: string;
  dek: string;
  quote?: string;
  sections: ArticleSection[];
};

const assetUrl = (fileName: string, manusPath: string) =>
  import.meta.env.VITE_USE_LOCAL_ASSETS === "true"
    ? `${import.meta.env.BASE_URL}assets/media/${fileName}`
    : manusPath;

export const siteAssets = {
  hero: assetUrl("hero-editorial.jpg", "/manus-storage/hero-editorial_106889d6.jpg"),
};

export const articles: Article[] = [
  {
    slug: "how-to-let-ai-write-excel-formulas-for-you",
    title: "How to Let AI Write Excel Formulas for You",
    excerpt:
      "The hard part is often not knowing the result you want. It is remembering the exact syntax—and catching the quiet ways a plausible formula can be wrong.",
    category: "AI",
    date: "September 11, 2026",
    readTime: "8 min read",
    image: assetUrl("ai-excel-formulas.jpg", "/manus-storage/ai-excel-formulas_6581e59d.jpg"),
    imageAlt: "Editorial collage showing a plain-language calculation becoming a tested spreadsheet formula",
    accent: "coral",
    dek: "A practical prompt sequence for translating intent into a formula, stress-testing the ugly rows, and saving the reasoning for next time.",
    quote: "Treat the first formula as a draft. The real skill is making its assumptions visible before a plausible number earns your trust.",
    sections: [
      {
        heading: "The syntax hunt is not the real work",
        blocks: [
          {
            type: "paragraph",
            text: "The familiar Excel struggle is not always deciding what result you need. It is remembering the exact function, nesting the arguments in the right order, and adapting a formula copied from an old workbook or forum post until the error messages disappear.",
          },
          {
            type: "paragraph",
            text: "AI can remove much of that translation work. Microsoft’s current Copilot in Excel guidance says it can generate formula columns and rows, suggest a formula for a single cell, build lookups, and explain existing formulas. Other general-purpose assistants can draft formulas too when you describe the workbook structure clearly.",
          },
          {
            type: "paragraph",
            text: "That does not make formula knowledge irrelevant. It changes where your attention belongs: from recalling syntax to specifying intent, exposing assumptions, and verifying the result. Microsoft’s guidance is direct on this point—review, edit, and verify anything AI creates.",
          },
          {
            type: "tip",
            text: "Do not paste confidential, regulated, personal, or client data into an AI service unless your organization has explicitly approved that tool and workflow.",
          },
        ],
      },
      {
        heading: "The five-step formula-first workflow",
        blocks: [
          {
            type: "list",
            items: [
              "**Name the result, not the function.** Describe what the completed cell should tell you in plain English.",
              "**Describe the sheet.** Name the relevant columns, ranges, table names, data types, and the Excel version you use.",
              "**Ask for syntax plus an explanation.** Require the assistant to translate every important part of the formula back into ordinary language.",
              "**Test a small sample by hand.** Include a normal row, a blank, a duplicate, a zero, and a value stored as text when those cases are possible.",
              "**Save the prompt with the formula.** The reasoning travels between workbooks more reliably than a cell reference copied without context.",
            ],
          },
          {
            type: "paragraph",
            text: "The order matters. A formula generator cannot infer a business rule you never state. If blanks should count as zero, duplicates should be ignored, or the match must be case-sensitive, put that rule in the request before treating the output as finished.",
          },
        ],
      },
      {
        heading: "Prompt 1: Translate the goal into a formula",
        blocks: [
          {
            type: "paragraph",
            text: "Start here when you know the calculation you want but cannot—or do not want to—reconstruct the syntax from memory.",
          },
          {
            type: "code",
            language: "Plaintext",
            code: "# CONTEXT\nI know what I want to calculate, but I do not remember the exact Excel formula syntax. I usually end up hunting through old spreadsheets or forum posts and reverse-engineering something close.\n\n# ROLE\nAct as a spreadsheet formula specialist who has debugged more broken formulas than they can count. Formulas often fail quietly by producing a plausible number because no one specified how to handle a blank cell, duplicate, error value, or number stored as text.\n\n# RESPONSE GUIDELINES\n1. Translate my plain-language goal into a working Excel formula.\n2. Before finalizing it, ask about the edge cases that matter for this calculation, such as blanks, text-formatted numbers, zeros, errors, and duplicates.\n\n# TASK CRITERIA\n1. Explain what the formula does in plain language alongside the formula itself.\n2. Flag every assumption you made about the data, such as \"assumes column B has no blanks,\" so I can confirm it.\n3. Use functions available in my Excel version, or identify any compatibility limitation.\n\n# MY DETAILS\n- What I want to calculate: [E.G., AVERAGE DEAL SIZE BY REGION]\n- Relevant columns, ranges, table names, and sheet names: [DESCRIBE YOUR DATA LAYOUT]\n- My Excel version or platform: [E.G., MICROSOFT 365 ON WINDOWS]\n\n# RESPONSE FORMAT\nReturn the formula, a plain-language explanation, the assumptions made, and three small test cases with expected results.",
          },
          {
            type: "tip",
            text: "A formula you cannot explain is difficult to audit. Ask what each function and reference contributes before you paste it into a production workbook.",
          },
        ],
      },
      {
        heading: "Prompt 2: Stress-test the ugly rows",
        blocks: [
          {
            type: "paragraph",
            text: "A formula that works on five clean sample rows can still fail silently farther down the sheet. This follow-up turns the assumptions from Prompt 1 into a focused edge-case review.",
          },
          {
            type: "code",
            language: "Plaintext",
            code: "# CONTEXT\nThe first formula works on my clean sample rows, but the full sheet may contain blanks, duplicate entries, inconsistent labels, errors, dates stored as text, and numbers stored as text.\n\n# ROLE\nStay in character as the same spreadsheet formula specialist. Never trust a formula until it has been checked against the ugly rows, not just the clean ones.\n\n# RESPONSE GUIDELINES\n1. Using the assumptions from the first response, identify the specific edge cases in my actual data that could break or distort the formula.\n2. Adjust the formula to handle them, or say explicitly when cleaning the source data is safer than adding more formula logic.\n\n# TASK CRITERIA\n1. Name the failure mode precisely. Do not say only \"this might not work.\" Explain what value the formula could silently produce and why that result would be wrong.\n2. Preserve a readable formula. If defensive logic makes it too difficult to audit, recommend a helper column or data-cleaning step instead.\n\n# MY DETAILS\n- Original formula and assumptions: [PASTE THE FIRST RESPONSE]\n- Known messiness in the data: [BLANKS, MIXED FORMATS, DUPLICATES, ERRORS, OR OTHER NOTES]\n\n# RESPONSE FORMAT\nReturn the edge cases found, the updated formula, a before-and-after test table, and one line naming anything safer to fix in the data than in the formula.",
          },
        ],
      },
      {
        heading: "Prompt 3: Make the reasoning reusable",
        blocks: [
          {
            type: "paragraph",
            text: "A saved formula is tied to one layout. A saved prompt can be adapted when the same calculation appears in a new workbook with different columns, table names, or business rules.",
          },
          {
            type: "code",
            language: "Plaintext",
            code: "# CONTEXT\nI repeat similar calculations across different spreadsheets. I want a small prompt library, not just saved formulas, because a formula alone does not travel well between sheets with different layouts.\n\n# ROLE\nStay in character as the same spreadsheet formula specialist.\n\n# RESPONSE GUIDELINES\n1. Build a concise reusable library entry for this calculation so I can regenerate and stress-test it for a new sheet layout.\n\n# TEMPLATE CRITERIA\n1. Include the calculation goal, the adaptable prompt, the required layout details, the known edge cases, and the minimum test cases.\n2. Replace workbook-specific cell references with clear placeholders.\n\n# RESPONSE FORMAT\nReturn one reusable block with these labels: Purpose, Prompt, Inputs to replace, Edge cases, and Test cases.",
          },
        ],
      },
      {
        heading: "What to test before you trust the result",
        blocks: [
          {
            type: "paragraph",
            text: "Testing does not require a full quality-assurance department. Build a tiny set of rows whose answers you can calculate by hand, then compare Excel’s result with your expected value. Include the cases most likely to expose a hidden assumption.",
          },
          {
            type: "list",
            items: [
              "A normal row with an obvious expected result.",
              "A blank input and a zero input—they are not always the same business condition.",
              "A number stored as text and a date stored as text.",
              "A duplicated record when the calculation depends on unique transactions or people.",
              "A misspelled category, extra space, or inconsistent capitalization.",
              "A missing lookup value and a formula error such as `#N/A` or `#DIV/0!`.",
            ],
          },
          {
            type: "tip",
            text: "Do not hide every error with IFERROR. Decide whether an error should become zero, blank, a warning label, or a visible problem that someone must fix.",
          },
        ],
      },
      {
        heading: "Build a formula assistant, not a formula vending machine",
        blocks: [
          {
            type: "paragraph",
            text: "If your preferred AI platform supports saved instructions, projects, custom assistants, or skills, store the three prompts with your organization’s formula conventions and data-handling rules. Then your next request can begin with the business calculation instead of rebuilding the review process.",
          },
          {
            type: "paragraph",
            text: "Keep the final paste human. Confirm the sheet layout, review the assumptions, run the test cases, and save the plain-language explanation beside the formula library. The goal is not to stop learning Excel. It is to spend less time retrieving punctuation and more time deciding what the calculation should mean.",
          },
        ],
      },
    ],
  },
  {
    slug: "working-with-excel-data-without-formulas",
    title: "Working with Excel Data Without Knowing a Single Formula",
    excerpt:
      "You do not need to become a spreadsheet expert before you can ask useful questions, spot patterns, and make a better decision.",
    category: "AI",
    date: "September 8, 2026",
    readTime: "9 min read",
    image: assetUrl("ai-spreadsheet-analysis.jpg", "/manus-storage/ai-spreadsheet-analysis_0d3dfe7d.jpg"),
    imageAlt: "Editorial illustration of a spreadsheet transforming into charts and a verified decision path",
    accent: "lime",
    dek: "A five-step workflow—and three copy-ready prompts—for turning a familiar spreadsheet into a clear, verifiable decision.",
    quote: "The goal is not to outsource judgment. It is to remove the setup friction between a real question and a useful first answer.",
    sections: [
      {
        heading: "A spreadsheet is a decision tool, not a math exam",
        blocks: [
          {
            type: "paragraph",
            text: "For most professionals, spreadsheets are a tool for making decisions—not a test of how many formulas you can remember. You should not have to master nested functions, build a manual PivotTable, or design a chart before you can ask a simple question about the numbers in front of you.",
          },
          {
            type: "paragraph",
            text: "Modern AI tools can shorten that distance. In Copilot for Excel, for example, you can ask a question in your own words and request a summary, trend, outlier, chart, or PivotTable. Microsoft’s current guidance still makes the essential caveat explicit: review, edit, and verify anything the AI creates.",
          },
          {
            type: "paragraph",
            text: "This is already changing how people work with business data. In Microsoft’s Eaton customer story, a project manager describes using Copilot to slice, group, and filter data around her needs. The useful shift is not the disappearance of analysis. It is that the first step can now be a question instead of a construction project.",
          },
        ],
      },
      {
        heading: "The five-step ask-first workflow",
        blocks: [
          {
            type: "list",
            items: [
              "**Open a familiar spreadsheet.** Choose a file you work with regularly and identify one question you have always wondered about.",
              "**Ask for high-level trends.** Start with: `What are the three biggest trends in this data?`",
              "**Verify the output.** Cross-check one or two claims against the raw numbers before accepting the summary.",
              "**Follow the surprise.** Ask a second question about the result you did not expect.",
              "**Make this your default first step.** Run the check before building a manual chart or PivotTable from scratch.",
            ],
          },
          {
            type: "tip",
            text: "Use an AI tool approved for the data you are handling. Do not upload confidential, regulated, personal, or client data to an unapproved service.",
          },
          {
            type: "paragraph",
            text: "The sequence matters. Ask broadly enough to discover what deserves attention, then narrow the question and verify the evidence. You are using AI to generate a hypothesis—not to manufacture certainty.",
          },
        ],
      },
      {
        heading: "Prompt 1: Spot trends and assess risk",
        blocks: [
          {
            type: "paragraph",
            text: "Use this prompt when you need a fast, plain-language read of a sheet without hiding uncertainty behind a confident tone.",
          },
          {
            type: "code",
            language: "Plaintext",
            code: "# CONTEXT\nI work with spreadsheets I do not fully understand, and getting a confident answer to a real question—\"what is actually going on here?\"—usually means learning to build a chart or PivotTable first.\n\n# ROLE\nAct as a data analyst who translates raw numbers for people who are not analysts. The real risk is not only giving a wrong answer; it is giving a confidently worded answer built on a shaky read, mistaking a seasonal blip for a real trend, or treating a small sample as a reliable pattern.\n\n# RESPONSE GUIDELINES\n1. Read the data and answer the specific question in plain language.\n2. State your confidence in the answer and explain why.\n\n# TASK CRITERIA\n1. If a pattern could plausibly be a fluke, a small sample, or the result of one outlier, say so explicitly.\n2. Avoid analyst jargon. Explain the findings as you would to a colleague over coffee.\n\n# MY DETAILS\n- Paste or describe your data: [PASTE YOUR DATA OR DESCRIBE THE SHEET]\n- Your specific question: [E.G., WHAT ARE THE BIGGEST TRENDS IN THIS DATA?]\n\n# RESPONSE FORMAT\nReturn the answer in plain language, followed by a one-line Confidence note explaining any caveat.",
          },
          {
            type: "tip",
            text: "A confidence label is useful only when the explanation names the evidence: sample size, missing values, outliers, seasonality, or another concrete limitation.",
          },
        ],
      },
      {
        heading: "Prompt 2: Turn the finding into an action",
        blocks: [
          {
            type: "paragraph",
            text: "Knowing that sales dipped in one region is not yet a decision. This follow-up forces the analysis to name the action, the trade-off, and the assumption that could overturn the recommendation.",
          },
          {
            type: "code",
            language: "Plaintext",
            code: "# CONTEXT\nKnowing the trend does not tell me what to do about it. Translating \"sales dipped in the West\" into an actual decision is where I usually get stuck.\n\n# ROLE\nStay in character as the same analyst. Never return a finding without also naming the decision it implies; a number without a recommendation can become a slide nobody acts on.\n\n# RESPONSE GUIDELINES\n1. Translate the finding from Step 1 into a specific recommendation: what should change, and what happens if nothing changes.\n\n# TASK CRITERIA\n1. State the recommendation as an action, not a restatement of the data.\n2. Name the real trade-off or risk; do not present the recommendation as risk-free.\n3. Name one specific data point that, if wrong, would change the recommendation.\n\n# MY DETAILS\n- Constraints on possible actions, such as budget, timing, or authority: [OPTIONAL]\n\n# RESPONSE FORMAT\nReturn the recommendation, the trade-off, and the one data point that would change your mind.",
          },
        ],
      },
      {
        heading: "Prompt 3: Build a reusable routine",
        blocks: [
          {
            type: "paragraph",
            text: "If the same report returns every week or month, stop beginning with a blank chat. Ask the AI to turn your best questions into a small, repeatable review checklist.",
          },
          {
            type: "code",
            language: "Plaintext",
            code: "# CONTEXT\nI return to this sheet—or this type of sheet—regularly. I want a standard set of questions to run whenever it is updated instead of starting cold each time.\n\n# ROLE\nStay in character as the same analyst.\n\n# RESPONSE GUIDELINES\n1. Build a short reusable list of the three or four questions worth asking this data every time it is updated.\n\n# TEMPLATE CRITERIA\n1. Keep the questions specific to this data type. Avoid generic advice such as \"check trends.\"\n\n# RESPONSE FORMAT\nReturn the finished list as one reusable block.",
          },
        ],
      },
      {
        heading: "Verify before you visualize",
        blocks: [
          {
            type: "paragraph",
            text: "A polished chart can make a weak interpretation feel stronger than it is. Before asking for the visual, confirm the time period, units, filters, missing values, and row count. Then check at least one important claim against the source cells.",
          },
          {
            type: "list",
            items: [
              "Ask which columns and rows support the conclusion.",
              "Check whether one unusually large value is driving the pattern.",
              "Compare the same period across prior years before calling a change a trend.",
              "Confirm that percentages use the right denominator.",
              "Request the chart only after the underlying claim survives those checks.",
            ],
          },
          {
            type: "tip",
            text: "AI can accelerate analysis, but it cannot decide what level of evidence your organization requires. Keep that standard human and explicit.",
          },
        ],
      },
      {
        heading: "Make the routine easier to repeat",
        blocks: [
          {
            type: "paragraph",
            text: "If you use a platform that supports saved instructions—such as a custom assistant, project, or reusable prompt—store the three prompts together with your standing questions. When the sheet is updated, provide the approved data and run the same sequence: observe, verify, decide, and record what changed.",
          },
          {
            type: "paragraph",
            text: "Keep the human checkpoint. Review the recommendation, document the source period, and save the assumptions that mattered. The best repeatable workflow is not the one that produces an answer with the fewest clicks. It is the one that makes a later reviewer able to understand why the answer deserved trust.",
          },
        ],
      },
    ],
  },
  {
    slug: "git-is-a-time-machine-not-a-backup-button",
    title: "Git Is a Time Machine, Not a Backup Button",
    excerpt:
      "Senior developers move faster because they understand Git as a timeline—and know how to recover when the timeline bends.",
    category: "Future of Work",
    date: "September 7, 2026",
    readTime: "7 min read",
    image: assetUrl("git-time-machine.jpg", "/manus-storage/git-time-machine_4adcdec7.jpg"),
    imageAlt: "Editorial illustration of a hand guiding branching project history through a time machine",
    accent: "blue",
    dek: "A practical guide to inspecting changes, building clean commits, navigating history, and recovering lost work without panic.",
    quote: "Confidence with Git comes from knowing that mistakes are usually navigable, visible, and recoverable.",
    sections: [
      {
        heading: "From backup service to project timeline",
        blocks: [
          {
            type: "paragraph",
            text: "For years, my entire Git workflow consisted of three basic commands:",
          },
          { type: "code", language: "Bash", code: "git add .\ngit commit -m \"update\"\ngit push" },
          {
            type: "paragraph",
            text: "I treated Git as a backup service: make changes, commit, and push. That changed when I watched a senior developer recover deleted commits, clean up six months of messy history, and repair a broken merge without panicking or searching the web.",
          },
          {
            type: "paragraph",
            text: "The takeaway was not that senior developers memorize more commands. They understand Git as a timeline of a project’s entire history. Once that model clicks, mistakes stop feeling final and start feeling like states you can inspect, navigate, and repair.",
          },
        ],
      },
      {
        heading: "Always inspect before you commit",
        blocks: [
          {
            type: "paragraph",
            text: "Run `git status` constantly—before committing, switching branches, or rebasing. It reveals what is staged, what is modified, and what Git is not tracking. That quick pause prevents accidental commits of secrets, debug logs, build artifacts, and temporary files.",
          },
          {
            type: "paragraph",
            text: "Use `git diff` to inspect exact working-tree changes. Before committing, use `git diff --staged` to review the snapshot you are actually about to record:",
          },
          { type: "code", language: "Bash", code: "git status\ngit diff\ngit diff --staged" },
          {
            type: "tip",
            text: "Treat the staged diff as your final editorial review. A clean commit begins with knowing precisely what it contains.",
          },
        ],
      },
      {
        heading: "Commit selectively",
        blocks: [
          {
            type: "paragraph",
            text: "Instead of staging everything with `git add .`, use patch mode to review changes hunk by hunk:",
          },
          { type: "code", language: "Bash", code: "git add -p" },
          {
            type: "paragraph",
            text: "Interactive staging lets you separate a refactor from a bug fix even when both changes live in the same file. The result is a series of atomic commits that are easier to review, revert, and understand months later.",
          },
        ],
      },
      {
        heading: "Debug and navigate history efficiently",
        blocks: [
          {
            type: "paragraph",
            text: "When you know a bug exists now but did not exist in an earlier release, `git bisect` performs a binary search through history to find the exact commit that introduced it:",
          },
          {
            type: "code",
            language: "Bash",
            code: "git bisect start\ngit bisect bad          # Current version has the bug\ngit bisect good v2.3.1  # Last known good release or commit",
          },
          {
            type: "paragraph",
            text: "Git checks out a midpoint. Test it, mark it good or bad, and repeat until the search isolates the first broken commit. When you finish, run `git bisect reset` to return to your original branch.",
          },
          {
            type: "paragraph",
            text: "For everyday orientation, visualize the branch structure and merge points in a compact graph:",
          },
          { type: "code", language: "Bash", code: "git log --oneline --graph --decorate\n\n# Optional shell alias\nalias gl='git log --oneline --graph --decorate'" },
        ],
      },
      {
        heading: "Context-switch without tangling your work",
        blocks: [
          {
            type: "paragraph",
            text: "Use `git stash` to place unfinished tracked changes in a temporary vault when an urgent interruption arrives. Restore them later with `git stash pop`:",
          },
          { type: "code", language: "Bash", code: "git stash push -m \"WIP: account settings\"\n# Work on the interruption, then return\ngit stash pop" },
          {
            type: "paragraph",
            text: "For longer parallel efforts, `git worktree` is often cleaner than repeatedly stashing and switching. It checks out another branch into a separate directory while your current working tree stays untouched:",
          },
          { type: "code", language: "Bash", code: "git worktree add ../hotfix-branch hotfix/login-timeout" },
          {
            type: "tip",
            text: "Use a stash for a short interruption. Use a worktree when two streams of work need to remain active side by side.",
          },
        ],
      },
      {
        heading: "Recover lost work and maintain history",
        blocks: [
          {
            type: "paragraph",
            text: "`git restore <file>` discards uncommitted changes in a file and returns it to its last committed state. Because that working-tree change is destructive, inspect the diff first.",
          },
          { type: "code", language: "Bash", code: "git diff -- path/to/file\ngit restore path/to/file" },
          {
            type: "paragraph",
            text: "`git reflog` is the deeper recovery tool. It records local movements of `HEAD`, including commits that appear to vanish after a reset or rebase. Find the lost reference, inspect it, and create a recovery branch before doing anything else:",
          },
          { type: "code", language: "Bash", code: "git reflog\ngit show <commit-id>\ngit switch -c recovery/<name> <commit-id>" },
          {
            type: "paragraph",
            text: "Before opening a pull request, `git rebase -i HEAD~N` lets you squash, reorder, or reword local commits. Use it on work you control; rewriting shared history can disrupt collaborators.",
          },
          {
            type: "paragraph",
            text: "When a line raises a question, `git blame <file>` shows the commit associated with each line. Treat it as a doorway into context: inspect the commit and discussion to learn why the code was introduced—not to assign blame.",
          },
        ],
      },
      {
        heading: "Reduce friction with aliases",
        blocks: [
          {
            type: "paragraph",
            text: "Once the underlying commands are familiar, short aliases can keep routine work flowing. Add the versions you actually use to `~/.bashrc` or `~/.zshrc`:",
          },
          {
            type: "code",
            language: "Bash",
            code: "alias gs='git status'\nalias ga='git add'\nalias gc='git commit -m'\nalias gp='git push'\nalias gl='git log --oneline --graph --decorate'",
          },
          {
            type: "tip",
            text: "Aliases should compress familiar actions, not conceal dangerous ones. Keep destructive or history-rewriting operations explicit.",
          },
        ],
      },
      {
        heading: "The real shift is confidence",
        blocks: [
          {
            type: "paragraph",
            text: "Mastering Git is not about memorizing complex operations. It is about building confidence through recovery tools. Learning to inspect changes with `git diff`, isolate working states with `git stash`, and retrieve lost work with `git reflog` turns Git from a scary backup system into a reliable time machine.",
          },
          {
            type: "paragraph",
            text: "Start with the habits that make your work visible: `git status`, `git diff`, and `git add -p`. Then practice recovery in a disposable repository. The goal is not command-line performance. It is the calm that comes from understanding what happened—and knowing you can find your way back.",
          },
        ],
      },
    ],
  },
  {
    slug: "terminal-workflow-hacks-for-developers",
    title: "Stop Using the Terminal Like a Vending Machine: 11 Workflow Hacks for Developers",
    excerpt:
      "The terminal isn’t just a utility for running scripts—it is your primary development environment.",
    category: "Future of Work",
    date: "September 7, 2026",
    readTime: "10 min read",
    image: assetUrl("terminal-workflow.jpg", "/manus-storage/terminal-workflow_26a19738.jpg"),
    imageAlt: "Editorial illustration of a developer navigating a fast terminal workflow across layered command windows",
    accent: "lime",
    dek: "Eleven practical habits, shortcuts, and configurations that remove friction from your daily command-line workflow.",
    quote: "Effortless terminal navigation isn’t about memorizing hundreds of obscure commands. It’s about eliminating repetitive friction points.",
    sections: [
      {
        heading: "Stop retyping previous commands",
        blocks: [
          {
            type: "paragraph",
            text: "I once watched a senior developer diagnose and fix a critical deployment issue in under 90 seconds. No Googling. No copy-pasting from cheat sheets. Just a smooth, uninterrupted flow through the terminal—as if he were having a conversation with his machine.",
          },
          {
            type: "paragraph",
            text: "I originally thought he possessed some secret, highly guarded toolset. He didn’t. He simply understood his environment better than I did. Most engineers use the terminal the same way they learned it in their first coding tutorial: type a command, press Enter, and repeat. That works, but it introduces micro-delays that compound into real friction.",
          },
          {
            type: "paragraph",
            text: "Running a long command only to realize it needs root privileges is a universal experience. Instead of pressing the up arrow and navigating to the start of the line, use `!!` to expand your last command:",
          },
          { type: "code", language: "Bash", code: "sudo !!" },
          {
            type: "paragraph",
            text: "Similarly, `!$` retrieves the last argument from your previous command, making chained operations effortless:",
          },
          { type: "code", language: "Bash", code: "mkdir my-project\ncd !$" },
          { type: "tip", text: "`!$` saves you from typing the directory name twice, removing instant overhead." },
        ],
      },
      {
        heading: "Upgrade to interactive history searching",
        blocks: [
          {
            type: "paragraph",
            text: "While the up arrow cycles through commands linearly, `Ctrl + R` performs a reverse search through your entire command history. Type any fragment to find its most recent invocation:",
          },
          { type: "code", language: "Plaintext", code: "(reverse-i-search)`docker': docker-compose up -d --build" },
          {
            type: "paragraph",
            text: "Press `Ctrl + R` again to cycle backward through older matches, `Enter` to run the command, or `Esc` to edit it.",
          },
          {
            type: "paragraph",
            text: "To make this feature more useful, retain a substantial history by adding the following configuration to `~/.bashrc` or `~/.zshrc`:",
          },
          { type: "code", language: "Bash", code: "HISTSIZE=10000\nHISTFILESIZE=20000\nHISTCONTROL=ignoredups:erasedups" },
        ],
      },
      {
        heading: "Correct typos on the fly",
        blocks: [
          {
            type: "paragraph",
            text: "If you execute a command with a typo, you do not need to reload and manually edit the line. Use the `^old^new` substitution pattern:",
          },
          { type: "code", language: "Bash", code: "git chekcout main\n^chekcout^checkout" },
          {
            type: "paragraph",
            text: "The shell immediately replaces `chekcout` with `checkout` in the previous command and executes the corrected version.",
          },
        ],
      },
      {
        heading: "Build a custom alias library",
        blocks: [
          {
            type: "paragraph",
            text: "Any command or parameter set you type more than five times a week belongs in an alias. Add the shortcuts that fit your work to `~/.bashrc` or `~/.zshrc`:",
          },
          {
            type: "code",
            language: "Bash",
            code: "# Navigation\nalias ..='cd ..'\nalias ...='cd ../..'\nalias -- -='cd -'\n\n# File listing\nalias ll='ls -alF'\nalias lt='ls -ltr'\n\n# Safety guards\nalias rm='rm -i'\nalias cp='cp -i'\nalias mv='mv -i'\n\n# Git workflows\nalias gs='git status'\nalias ga='git add .'\nalias gc='git commit -m'\nalias gp='git push'\nalias gl='git log --oneline --graph --decorate'\nalias gco='git checkout'\n\n# Docker management\nalias dps='docker ps'\nalias dc='docker-compose'\nalias dcu='docker-compose up -d'\nalias dcd='docker-compose down'\n\n# Shell reload\nalias reload='source ~/.bashrc'",
          },
          {
            type: "tip",
            text: "The `alias -- -='cd -'` shortcut acts like a browser back button, switching instantly to your previous working directory. Review interactive safety aliases before using them inside scripts.",
          },
        ],
      },
      {
        heading: "Master essential line-editing shortcuts",
        blocks: [
          {
            type: "paragraph",
            text: "Navigating a long command with arrow keys is inefficient. These built-in keyboard shortcuts let you edit at the speed of thought:",
          },
          {
            type: "list",
            items: [
              "`Ctrl + A` — Jump to the beginning of the line",
              "`Ctrl + E` — Jump to the end of the line",
              "`Ctrl + W` — Delete the word behind the cursor",
              "`Ctrl + U` — Clear everything before the cursor",
              "`Ctrl + K` — Clear everything after the cursor",
              "`Ctrl + L` — Clear the terminal screen",
              "`Alt + F` — Move forward one word",
              "`Alt + B` — Move backward one word",
            ],
          },
          {
            type: "tip",
            text: "Combine `Ctrl + A` followed by `Ctrl + K` to clear an entire line without holding Backspace.",
          },
        ],
      },
      {
        heading: "Preserve remote work sessions with tmux",
        blocks: [
          {
            type: "paragraph",
            text: "If an SSH connection drops while a long script is running, the process can die with the session. A terminal multiplexer such as `tmux` keeps your session alive on the server regardless of your connection status.",
          },
          {
            type: "code",
            language: "Bash",
            code: "# Start a named session\ntmux new -s myproject\n\n# Detach: press Ctrl + B, then D\n\n# Reattach later\ntmux attach -t myproject",
          },
          {
            type: "list",
            items: [
              "`Ctrl + B`, then `%` — Split the active pane vertically",
              "`Ctrl + B`, then `\"` — Split the active pane horizontally",
              "`Ctrl + B`, then an arrow key — Switch the active pane",
            ],
          },
        ],
      },
      {
        heading: "Manage background and foreground tasks",
        blocks: [
          {
            type: "paragraph",
            text: "Keep your terminal tab free while longer processes—such as tests or builds—run by appending `&` to the command:",
          },
          { type: "code", language: "Bash", code: "npm run build &" },
          {
            type: "list",
            items: [
              "Press `Ctrl + Z` to suspend an active foreground process.",
              "Run `bg` to resume it in the background.",
              "Run `fg` to bring it back to the foreground.",
              "Run `jobs` to see active background tasks in the current shell.",
            ],
          },
        ],
      },
      {
        heading: "Automate repetitive multi-command tasks",
        blocks: [
          {
            type: "paragraph",
            text: "Unlike aliases, shell functions can accept arguments and combine several steps. This function changes directory and immediately lists its contents:",
          },
          { type: "code", language: "Bash", code: "function cl() {\n  cd \"$1\" && ls -la\n}" },
          {
            type: "paragraph",
            text: "Running `cl project-folder` now switches into the directory and displays its contents in a single step.",
          },
        ],
      },
      {
        heading: "Implement interactive fuzzy searching with fzf",
        blocks: [
          {
            type: "paragraph",
            text: "If you adopt only one new CLI tool today, make it `fzf`, the command-line fuzzy finder. It transforms flat searches into interactive, real-time filtering lists.",
          },
          { type: "code", language: "Bash", code: "# macOS\nbrew install fzf\n\n# Ubuntu / Debian\nsudo apt install fzf" },
          {
            type: "paragraph",
            text: "Once installed, `Ctrl + R` becomes a real-time interactive history finder. You can also pipe other workflows through `fzf`:",
          },
          {
            type: "code",
            language: "Bash",
            code: "# Interactive file selection and editing\nvim $(fzf)\n\n# Interactive Git branch switching\ngit checkout $(git branch | fzf)\n\n# Interactively search and select a process ID\nps aux | fzf",
          },
          {
            type: "tip",
            text: "Inspect a selected process before killing it. Fast workflows should reduce friction without removing deliberate safety checks.",
          },
        ],
      },
      {
        heading: "Pipe output directly to the system clipboard",
        blocks: [
          {
            type: "paragraph",
            text: "Stop manually highlighting terminal output to copy it. Pipe the result directly to the system clipboard for complete, repeatable precision:",
          },
          {
            type: "code",
            language: "Bash",
            code: "# macOS\ncat ~/.ssh/id_rsa.pub | pbcopy\n\n# Linux with xclip installed\ncat ~/.ssh/id_rsa.pub | xclip -selection clipboard",
          },
          {
            type: "tip",
            text: "Be deliberate with secrets. Clipboard managers and other applications may retain copied API tokens or private values.",
          },
        ],
      },
      {
        heading: "Auto-correct terminal commands with thefuck",
        blocks: [
          {
            type: "paragraph",
            text: "When you mistype a complex command, the open-source tool `thefuck` can evaluate the previous failure, suggest corrected syntax, and ask you to approve the change.",
          },
          { type: "code", language: "Bash", code: "sudo apt install thefuck\n\n# After a failed command\nfuck" },
          {
            type: "paragraph",
            text: "Because the tool generates a command for execution, read the proposed correction before accepting it—especially when elevated permissions or destructive operations are involved.",
          },
        ],
      },
      {
        heading: "Start small and let the gains compound",
        blocks: [
          {
            type: "paragraph",
            text: "Effortless terminal navigation is not about memorizing hundreds of obscure commands. It is about eliminating repetitive friction points.",
          },
          {
            type: "paragraph",
            text: "Pick one or two habits—perhaps `Ctrl + R` for history search, faster line navigation, or a few personal aliases—and fold them into your daily workflow. Over time, these small optimizations compound into a faster, smoother, and more intuitive development experience.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-agents-from-chat-to-action",
    title: "AI agents are moving from chat to action. Here’s what changes.",
    excerpt:
      "The useful question is no longer only what an AI can say—it’s what we should allow it to do.",
    category: "AI",
    date: "September 6, 2026",
    readTime: "7 min read",
    image: assetUrl("ai-agents.jpg", "/manus-storage/ai-agents_39842fb7.jpg"),
    imageAlt: "Editorial illustration of small AI agents coordinating a workflow with a human decision-maker",
    accent: "coral",
    dek: "A practical field guide to the new layer between a prompt and a finished task—and the human judgment it still needs.",
    sections: [
      {
        heading: "The shift is bigger than a better chatbot",
        paragraphs: [
          "A chatbot waits for a question. An agent is designed to pursue an outcome. It can break a goal into steps, use tools, check intermediate results, and return with work that is closer to finished. That sounds like a subtle distinction, but it changes our relationship with software.",
          "The interface starts to recede. Instead of learning a sequence of menus, a person describes the destination. The system proposes a route. This can make routine work dramatically lighter—but it can also hide important choices inside an apparently smooth experience.",
        ],
      },
      {
        heading: "Autonomy should come in layers",
        paragraphs: [
          "The safest way to think about agents is not as either autonomous or not autonomous. Give them a ladder. At the first rung, the system observes and recommends. At the second, it drafts and waits. At the third, it acts within a narrow boundary. Only later should it handle broader, reversible work without a checkpoint.",
          "The higher the stakes, the more visible the handoff should be. Sending a calendar invitation is different from agreeing to a contract. Sorting files is different from deleting them. Good agent design makes those differences obvious instead of burying them in one universal ‘approve’ button.",
        ],
      },
      {
        heading: "Three questions to ask before you delegate",
        paragraphs: [
          "First: can the action be undone? Second: can you see the evidence behind the recommendation? Third: who notices when the system is confidently wrong? These questions are simple enough to remember and strong enough to expose most weak automation ideas.",
          "Agents are most valuable when they expand human attention—not when they ask us to surrender it. Start with tedious, reviewable work. Keep consequential decisions legible. And measure the quality of the outcome, not merely the speed of the process.",
        ],
      },
    ],
  },
  {
    slug: "personal-data-private-by-design",
    title: "Your personal data deserves a private-by-design future",
    excerpt:
      "Privacy cannot remain a settings page we visit after something goes wrong.",
    category: "Digital Life",
    date: "September 2, 2026",
    readTime: "6 min read",
    image: assetUrl("privacy.jpg", "/manus-storage/privacy_7f496d62.jpg"),
    imageAlt: "Editorial illustration of a sculptural privacy shield surrounded by encrypted data fragments",
    accent: "blue",
    dek: "The next generation of digital products should make the protective choice the easiest choice—not the expert choice.",
    sections: [
      {
        heading: "Privacy is an experience, not a document",
        paragraphs: [
          "Most people encounter privacy as a wall of legal language or a long grid of toggles. That is compliance made visible, not care made tangible. A private-by-design product explains what it collects at the moment that information becomes relevant, and it offers a meaningful alternative.",
          "The best protective systems reduce the amount of trust they require. They collect less, retain it for less time, and process sensitive information as close to the user as possible. Good intentions matter, but architecture matters more.",
        ],
      },
      {
        heading: "Watch the defaults",
        paragraphs: [
          "Defaults quietly define the social contract of a product. If sharing, tracking, or permanent retention is turned on before a person understands it, the interface is making a decision on their behalf.",
          "A useful test is simple: would a reasonable person be surprised by what happens next? If the answer is yes, the design needs another pass. Consent should be specific, reversible, and proportionate to the benefit being offered.",
        ],
      },
      {
        heading: "A better bargain is possible",
        paragraphs: [
          "People should not have to trade dignity for convenience. Product teams can compete on restraint, clear explanations, local processing, and short retention windows. These choices can become visible advantages rather than invisible engineering details.",
        ],
      },
    ],
  },
  {
    slug: "spatial-computing-beyond-headsets",
    title: "Spatial computing is bigger than the headset",
    excerpt:
      "The more interesting future begins when digital information understands the room around us.",
    category: "Emerging Tech",
    date: "August 28, 2026",
    readTime: "5 min read",
    image: assetUrl("spatial-computing.jpg", "/manus-storage/spatial-computing_af406f8d.jpg"),
    imageAlt: "Editorial illustration of a hand arranging spatial interfaces around a globe in a room",
    accent: "lime",
    dek: "Look past the hardware cycle and a more consequential idea comes into focus: computing that is anchored to place.",
    sections: [
      {
        heading: "The room becomes part of the interface",
        paragraphs: [
          "For decades, digital work has been compressed into rectangles. Spatial systems loosen that constraint. Information can attach to a machine, a building, a route, or a shared table. The environment stops being a backdrop and becomes a source of context.",
          "This matters well beyond entertainment. A technician can see guidance beside the equipment being repaired. A student can explore a molecular structure at human scale. A designer can test proportion before an object exists.",
        ],
      },
      {
        heading: "The hard problem is social",
        paragraphs: [
          "When computers perceive a space, they may also perceive the people in it. That creates difficult questions about bystanders, shared ownership, recording, and the meaning of consent in a room with several participants.",
          "The winning systems will not simply render convincing objects. They will make sensing visible, give bystanders agency, and gracefully disappear when attention belongs elsewhere.",
        ],
      },
      {
        heading: "Judge it by what becomes easier",
        paragraphs: [
          "A new device is not automatically a new medium. Look for tasks that become clearer, safer, or more collaborative because information has a place. When spatial computing works, the technology is not the center of the story—the work is.",
        ],
      },
    ],
  },
  {
    slug: "human-checklist-before-adopting-ai",
    title: "A human checklist before your team adopts another AI tool",
    excerpt:
      "Six calm questions can save months of noisy experimentation.",
    category: "Future of Work",
    date: "August 22, 2026",
    readTime: "8 min read",
    image: assetUrl("hero-editorial.jpg", "/manus-storage/hero-editorial_106889d6.jpg"),
    imageAlt: "Editorial collage of a human profile, microchip, hand, and network pathways",
    accent: "navy",
    dek: "A useful AI strategy starts with the work, the people, and the consequences—not the feature list.",
    sections: [
      {
        heading: "Begin with friction, not fascination",
        paragraphs: [
          "New tools arrive wrapped in possibility. Teams often begin by asking where they can use AI, then go looking for a problem. Reverse the order. Find the recurring bottleneck, the neglected queue, or the task that consumes judgment without rewarding it.",
          "A clear problem gives you a baseline. Without one, every demo looks impressive and every pilot can declare victory without improving the work.",
        ],
      },
      {
        heading: "Name the human owner",
        paragraphs: [
          "Every AI-assisted workflow needs a person who owns the outcome. Ownership is not the same as manually reviewing every line. It means someone understands the standard, can inspect the evidence, and has the authority to stop or change the process.",
        ],
      },
      {
        heading: "Measure the right thing",
        paragraphs: [
          "Time saved is useful but incomplete. Track corrections, escalations, user trust, and the work that moved downstream. A faster first draft is not progress if it creates a slower approval process.",
        ],
      },
    ],
  },
  {
    slug: "signals-that-a-tech-trend-will-stick",
    title: "Five signals that a technology trend might actually stick",
    excerpt:
      "Ignore the volume. Watch behavior, infrastructure, and boring repetition.",
    category: "Emerging Tech",
    date: "August 15, 2026",
    readTime: "4 min read",
    image: assetUrl("spatial-computing.jpg", "/manus-storage/spatial-computing_af406f8d.jpg"),
    imageAlt: "Editorial scene of dimensional technology layers arranged in a physical space",
    accent: "coral",
    dek: "A durable shift usually looks less like a launch event and more like a habit quietly taking root.",
    sections: [
      {
        heading: "Watch what people repeat",
        paragraphs: [
          "Novelty earns a trial. Utility earns a routine. The strongest signal is not a download or a headline but the moment a person reorganizes work around a tool and feels its absence when it is gone.",
        ],
      },
      {
        heading: "Look for the invisible layer",
        paragraphs: [
          "Durable technologies grow an ecosystem of standards, training, maintenance, and complementary products. This infrastructure is rarely exciting, but it turns a clever demonstration into something other people can reliably build upon.",
        ],
      },
      {
        heading: "Boredom can be a milestone",
        paragraphs: [
          "A technology becomes consequential when it becomes ordinary. When people stop describing the mechanism and start discussing the result, the shift has moved from spectacle to substrate.",
        ],
      },
    ],
  },
  {
    slug: "quiet-reinvention-of-search",
    title: "The quiet reinvention of search",
    excerpt:
      "Finding an answer is becoming a conversation. Verifying it still takes work.",
    category: "Digital Life",
    date: "August 8, 2026",
    readTime: "6 min read",
    image: assetUrl("privacy.jpg", "/manus-storage/privacy_7f496d62.jpg"),
    imageAlt: "Abstract editorial technology illustration with data fragments and a central frame",
    accent: "blue",
    dek: "Search is changing from a map of sources into a synthesized response. That makes source literacy more important, not less.",
    sections: [
      {
        heading: "From results to responses",
        paragraphs: [
          "Traditional search gives us a ranked set of doors. Conversational search increasingly attempts to walk through those doors, compare what is inside, and return with a summary. The experience is efficient precisely because so much of the process becomes invisible.",
        ],
      },
      {
        heading: "Convenience changes our responsibility",
        paragraphs: [
          "A fluent answer can make uncertainty difficult to see. Readers need visible sources, clear boundaries, and a habit of checking the evidence when the decision matters. The goal is not universal skepticism. It is calibrated trust.",
        ],
      },
      {
        heading: "A two-speed reading habit",
        paragraphs: [
          "Use fast synthesis to orient yourself. Switch to slow verification for consequential claims. A good system should help you make that transition by preserving links, exposing disagreement, and showing where the answer may be incomplete.",
        ],
      },
    ],
  },
];

export const topics = ["All", "AI", "Digital Life", "Future of Work", "Emerging Tech"] as const;
