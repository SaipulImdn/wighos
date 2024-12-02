````markdown
# Wighos

**Wighos** is a CLI package manager designed to simplify the creation of applications with clean architecture. With Wighos, you can easily create applications based on **Express.js**, **Golang**, or **Rust** with just one command!

## Features

- **Supported Stacks**:
  - Express.js (Node.js)
  - Golang (Clean Architecture)
  - Rust
- **Easy Customization**:
  - Choose the Node.js, npm, or Golang version you want to use.
- **Automatic Installation**:
  - Installs dependencies automatically after the app is created.

## Installation

Wighos does not require permanent installation on your system. Simply use `npx` to run it directly.

## Usage

### Create a New Application

Use the following command to create a new application:

```bash
npx wighos generate <app-name>
```
````

- **`<app-name>`**: The name of the application or the folder where the application will be created.

Example:

```bash
npx wighos generate myapp
```

### Choose Your Stack

After running the command above, Wighos will prompt you to choose the desired stack and version:

- Choose **Express.js**, **Golang**, or **Rust**.
- Select the **Node.js**, **npm**, or **Golang** version to use.
- The application name and version will be automatically updated in the project configurations (like `package.json`, `go.mod`, or `Cargo.toml`).

### Final Result

After the process is complete:

- The application folder structure will be ready for use.
- Dependencies will be automatically installed.

```

In this updated version, **Rust** has been added to the list of available stacks, and the documentation now reflects this new option. Users can choose between **Express.js**, **Golang**, and **Rust** when generating a new application.
```
