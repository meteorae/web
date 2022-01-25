<h1 align="center">Meteorae Web</h1>
<h3 align="center">React-based web client for Meteorae</h3>

<p align="center">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/meteorae/web/main">
    <a href="">
        <img alt="Discord" src="https://img.shields.io/discord/935381762362712084">
    </a>
    <a href="https://github.com/meteorae/web/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/meteorae/web">
    </a>
    <img alt="GitHub release (latest by SemVer)" src="https://img.shields.io/github/downloads/meteorae/web/latest/total">
</p>
<p align="center">
    <a href="https://sonarcloud.io/summary/new_code?id=meteorae_server">
        <img alt="Coverage" src="https://sonarcloud.io/api/project_badges/measure?project=meteorae_web&metric=coverage">
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=meteorae_server">
        <img alt="Maintainability Rating" src="https://sonarcloud.io/api/project_badges/measure?project=meteorae_web&metric=sqale_rating">
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=meteorae_server">
        <img alt="Technical Debt" src="https://sonarcloud.io/api/project_badges/measure?project=meteorae_web&metric=sqale_index">
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=meteorae_web">
        <img alt="Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=meteorae_web&metric=alert_status">
    </a>
</p>
<p align="center">
    <img alt="GitHub" src="https://img.shields.io/github/license/meteorae/web">
    <a href="https://master--61ef3d85cf1d30003a502bef.chromatic.com">
        <img alt="Storybook" src="https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg">
    </a>
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/meteorae/web">
</p>

## Overview

This is the main web client for [Meteorae](https://github.com/meteorae/server). It provides a built-in way to access your server and play the media contained on it.

If you want to install Meteroae, [see the meteorae/server repository instead](https://github.com/meteorae/server).

## Contributing

You will need a locally running instance of [Meteorae](https://github.com/meteorae/server) for development, as well as [Node.js](https://nodejs.org/en/), and [Yarn](https://classic.yarnpkg.com/en/docs/install).

Make sure your local Meteorae instance is running, then launch the web client's development server:

```shell
yarn start
```

[Storybook](https://storybook.js.org/) is also available for exploring components and their documentation:

```shell
yarn storybook
```

A hosted instance of our Storybook is provided by Chromatic, and can be found [here](https://master--61ef3d85cf1d30003a502bef.chromatic.com).
