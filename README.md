
# @marrocode/* Plugins Workspace

This workspace manages the full suite of `@marrocode` plugins listed below:

- [@marrocode/ns-ai-kit](packages/ns-ai-kit/README.md)

---

## ⚡ Quickstart

```bash
npm run setup
npm start
````

> Node 20+ is recommended for best compatibility.

If you ever feel lost or unsure what to do next, just run `npm start` and follow the interactive prompts.

---

## 🚀 What can you do here?

This monorepo streamlines development, testing, and publishing for all plugins in one place.

### Add a new plugin package

```bash
npm run add
```

* Enter the new package name when prompted.
* This creates a ready-to-develop plugin scaffold inside `packages/`.
* Updates all demo apps to support your new package.
* Shares demo code across all app flavors via `tools/demo`.
* Updates build tools and the interactive CLI (`npm start`).
* Automatically adds the new package to this README.

### Add Angular support to an existing package

```bash
npm run add-angular
```

* Enter the package name when prompted.
* Adds an `angular/` folder with the boilerplate needed for Angular compatibility.

### Develop a single package in isolation

```bash
npm start
```

* Select the package you want to focus on.
* The demos and IDE setups will isolate that package for faster development.
* **Tip:** Clean the demo app after focusing (`npm start` offers a clean option) to avoid stale builds.

### Publish packages

```bash
npm run publish-packages
```

* Select which packages to publish or leave blank to publish all.
* Choose the version or leave blank to auto bump patch version.
* Supports prerelease versions (alpha, beta, rc) and tags them correctly on npm.
* You get a sanity check prompt before publishing, so no surprises.

---

## 💡 Pro Tips

* Always keep Node updated (20+) for smooth builds.
* Use the interactive `npm start` command as your control center.
* Share demo code once, run everywhere — saves tons of time.
* Contribute back! This workspace is designed for growth and collaboration.

---

<h3 align="center">Made with ❤️ by @marrocode</h3>

