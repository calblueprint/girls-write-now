# Girls Write Now

This project is designed and developed by a team of UC Berkeley students through one of [Cal Blueprint](https://calblueprint.org/)'s project teams during the 2023-24 academic year.

Learn more about [Girls Write Now](https://girlswritenow.org/) and [Cal Blueprint](https://calblueprint.org/).

## App Preview

### Story Search/Filtering

https://github.com/calblueprint/girls-write-now/assets/34043950/6277c625-fa8a-495d-b2eb-ba70807cfd87

### Story Recommendation

![Simulator Screen Recording - iPhone 15 - 2024-04-25 at 14 09 19](https://github.com/calblueprint/girls-write-now/assets/34043950/6a92dbf7-be0e-4210-8a66-35fddd578fee)

### Saving/Favoriting Stories

![saved stories](https://github.com/calblueprint/girls-write-now/assets/34043950/e40b5a50-d53c-497a-8b70-433def6dde67)

### Reacting To Stories

![reactions](https://github.com/calblueprint/girls-write-now/assets/34043950/32d5c54e-5a4e-4517-8475-ea38b2e4cf69)

---

## Getting Started

### Prerequisites

Check your installation of `npm` and `node`:

```sh
node -v
npm -v
```

We strongly recommend using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) (for Mac) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows) to install Node.js and npm. See [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Installation

1. Clone the repo & install dependencies
   1. Clone this repo
      - using SSH (recommended)
        ```sh
        git clone git@github.com:calblueprint/girls-write-now.git
        ```
      - using HTTPS
        ```sh
        git clone https://github.com/calblueprint/girls-write-now.git
        ```
   2. Enter the cloned directory
      ```sh
      cd girls-write-now
      ```
   3. Install project dependencies. This command installs all packages from [`package.json`](package.json).
      ```sh
      npm install
      ```
2. Set up secrets:
   1. In the project's root directory (`girls-write-now/`), create a new file named `.env`
   2. Copy the credentials from [Blueprint's internal Notion](https://www.notion.so/calblueprint/Secrets-34fde2e9c9bb41d0ad1cb2bebedadd28?pvs=4) (access is required) and paste them into the `.env` file.

**Helpful resources**

- [GitHub: Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
- [GitHub: Generating SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### Development environment

- **[VSCode](https://code.visualstudio.com/) (recommended)**
  1. Open the `girls-write-now` project in VSCode.
  2. Install recommended workspace VSCode extensions. You should see a pop-up on the bottom right to "install the recommended extensions for this repository".

### Running the app

1. In the project directory, run:
   ```shell
    npx expo start
   ```
2. There are several ways to test the app:
   - **Expo Go (Recommended)**: [download Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-android-and) on your phone, **connect to same network as your laptop**, and use your phone camera to scan the QR code displayed in the command line.
   - Web: typing `w` into the expo command line opens the app in a web view.
     - Warning: since the app is designed to be used on a mobile app, web compatibility might be limited, and some functionality might be different when using the web setup.
