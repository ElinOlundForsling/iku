# IKU いく

[see it in action!](https://iku.vercel.app/)
Iku is a todolist app made in Nextjs, React and Typescript, with a built-in firebase backend.

## Installation

Clone the reposity and hit npm install. You will need to get your own firebase reposity, and then create a .env.local file in your root and put in the variables

```bash
npm i
mkdir .env.local
```

```bash
FIREBASE_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_SENDER_ID=
FIREBASE_APP_ID=
```

## User Stories
●  ⚠ (required): I as a user can create to-do items, such as a grocery list
●  ⚠ (required): I as ​another user​ can collaborate in real-time with ​user​ - so that we can (for example) edit our family shopping-list together
●  I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on things that are still pending
●  I as a user can filter the to-do list and view items that were marked as done - so that I can retrospect on my prior progress
●  I as a user can add sub-tasks to my to-do items - so that I could make logical groups of tasks and see their overall progress
●  I as a user can specify cost/price for a task or a subtask - so that I can track my expenses / project cost
●  I as a user can see the sum of the subtasks aggregated in the parent task - so that in my shopping list I can see what contributes to the overall sum. For example I can have a task “Salad”, where I'd add all ingredients as sub-tasks, and would see how much does salad cost on my shopping list
●  I as a user can create multiple to-do lists where each list has it's unique URL that I can share with my friends - so that I could have separate to do lists for my groceries and work related tasks
●  I as a user can keep editing the list even when I lose internet connection, and can expect it to sync up with BE as I regain connection
●  I as a user can change the order of tasks via drag & drop
●  I as a user can be sure that my todos will be persisted so that important information is not lost when server restarts

