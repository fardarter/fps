// SN These should be installed --no-save on script initiation
// eslint-disable-next-line import/no-unresolved
const spaceImport = require("contentful-import");
const inquirer = require("inquirer");
const chalk = require("chalk");

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`
});

const argv = require("yargs-parser")(process.argv.slice(2));
const exportFile = require("../contentful/export.json");

const questions = [
  {
    name: "spaceId",
    message: "Your Space ID",
    when: !argv.spaceId && !process.env.CONTENTFUL_SPACE_ID,
    validate: input =>
      /^[a-z0-9]{12}$/.test(input) || "Space ID must be 12 lowercase characters"
  },
  {
    name: "managementToken",
    when: !argv.managementToken && !process.env.CONTENT_MANAGEMENT_TOKEN,
    message: "Your Content Management API access token"
  },
  {
    name: "accessToken",
    when: !argv.accessToken && !process.env.CONTENTFUL_ACCESS_TOKEN,
    message: "Your Content Delivery API access token"
  }
];

inquirer
  .prompt(questions)
  .then(({ spaceId, managementToken }) => {
    const { CONTENTFUL_SPACE_ID, CONTENT_MANAGEMENT_TOKEN } = process.env;

    // env vars are given precedence followed by args provided to the setup
    // followed by input given to prompts displayed by the setup script
    const newSpaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId;
    const newManagementToken =
      CONTENT_MANAGEMENT_TOKEN || argv.managementToken || managementToken;

    return { spaceId: newSpaceId, managementToken: newManagementToken };
  })
  .then(({ spaceId, managementToken }) =>
    spaceImport({ spaceId, managementToken, content: exportFile })
  )
  .then((_, error) => {
    // eslint-disable-next-line no-console
    console.log(
      `All set! You can now run ${chalk.yellow(
        "yarn run dev"
      )} to see it in action.`
    );
  })
  .catch(error => console.error(error));
