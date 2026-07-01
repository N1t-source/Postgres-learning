import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(relPath, content) {
  const filePath = path.join(root, relPath);
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, "utf8");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const navItems = [
  ["Home", "/docs/index.html", "home"],
  ["Syllabus", "/docs/syllabus/index.html", "syllabus"],
  ["Sessions", "/docs/sessions/index.html", "sessions"],
  ["Lessons", "/docs/lessons/index.html", "lessons"],
  ["Labs", "/docs/labs/index.html", "labs"],
  ["Quizzes", "/docs/quizzes/index.html", "quizzes"],
  ["References", "/docs/references/index.html", "references"],
  ["Schema Notes", "/docs/schema-notes/index.html", "schema"],
  ["Query Notes", "/docs/query-notes/index.html", "queries"],
  ["Architecture", "/docs/architecture/index.html", "architecture"],
  ["Session Notes", "/docs/session-notes/index.html", "session-notes"],
  ["Commit Reviews", "/docs/commit-reviews/index.html", "commit-reviews"],
  ["Prompts", "/docs/prompts/index.html", "prompts"],
];

const sessions = [
  { n: 1, phase: "Foundations", title: "Why databases exist" },
  { n: 2, phase: "Foundations", title: "Tables, rows, columns, and schemas" },
  { n: 3, phase: "Foundations", title: "Primary keys and row identity" },
  { n: 4, phase: "Foundations", title: "Data types and NULL" },
  { n: 5, phase: "Foundations", title: "What PostgreSQL is and how psql fits" },
  { n: 6, phase: "SQL Foundations", title: "SELECT, FROM, and aliases" },
  { n: 7, phase: "SQL Foundations", title: "WHERE and comparison operators" },
  { n: 8, phase: "SQL Foundations", title: "ORDER BY and LIMIT" },
  { n: 9, phase: "SQL Foundations", title: "INSERT" },
  { n: 10, phase: "SQL Foundations", title: "UPDATE and DELETE" },
  { n: 11, phase: "PostgreSQL Basics", title: "Creating a database and inspecting it" },
  { n: 12, phase: "PostgreSQL Basics", title: "Creating tables and describing them" },
  { n: 13, phase: "PostgreSQL Basics", title: "text, varchar, integer, and numeric" },
  { n: 14, phase: "PostgreSQL Basics", title: "boolean, date, time, and timestamp" },
  { n: 15, phase: "PostgreSQL Basics", title: "serial vs identity and safe dropping" },
  { n: 16, phase: "Data Modeling", title: "Entities and attributes from country requirements" },
  { n: 17, phase: "Data Modeling", title: "Regions and continents" },
  { n: 18, phase: "Data Modeling", title: "One-to-many relationships" },
  { n: 19, phase: "Data Modeling", title: "Many-to-many relationships and join tables" },
  { n: 20, phase: "Data Modeling", title: "Normalization and naming conventions" },
  { n: 21, phase: "Constraints", title: "PRIMARY KEY and NOT NULL" },
  { n: 22, phase: "Constraints", title: "UNIQUE, DEFAULT, and CHECK" },
  { n: 23, phase: "Constraints", title: "Foreign keys and referential actions" },
  { n: 24, phase: "Constraints", title: "Integrity failure cases" },
  { n: 25, phase: "Joins", title: "INNER JOIN" },
  { n: 26, phase: "Joins", title: "LEFT JOIN" },
  { n: 27, phase: "Joins", title: "RIGHT JOIN and FULL OUTER JOIN" },
  { n: 28, phase: "Joins", title: "CROSS JOIN and self joins" },
  { n: 29, phase: "Aggregation", title: "COUNT and SUM" },
  { n: 30, phase: "Aggregation", title: "AVG, MIN, and MAX" },
  { n: 31, phase: "Aggregation", title: "GROUP BY" },
  { n: 32, phase: "Aggregation", title: "HAVING and summary reports" },
  { n: 33, phase: "Mock Data and Seeding", title: "Seed files and fake data" },
  { n: 34, phase: "Mock Data and Seeding", title: "CSV import and reset scripts" },
  { n: 35, phase: "Testing", title: "Testing inserts and constraints" },
  { n: 36, phase: "Testing", title: "Testing joins and query results" },
  { n: 37, phase: "Transactions", title: "BEGIN, COMMIT, and ROLLBACK" },
  { n: 38, phase: "Transactions", title: "Atomicity and consistency" },
  { n: 39, phase: "Indexes and Performance", title: "Indexes and B-tree basics" },
  { n: 40, phase: "Indexes and Performance", title: "EXPLAIN, EXPLAIN ANALYZE, and query planning" },
];

function sessionTheme(session) {
  const title = session.title.toLowerCase();
  if (title.includes("why databases exist")) {
    return {
      objective: "Explain why a relational database is useful when many people need the same country facts.",
      concept: "A database keeps one source of truth, while files and spreadsheets often spread the same fact across many places.",
      postgres: "PostgreSQL gives that source of truth a durable home, SQL language, and rules that protect shared data.",
      lab: "Compare a flat country list with a tiny relational model and explain which one better supports change.",
      files: ["README.md", "docs/index.html", "docs/syllabus/index.html", "docs/sessions/session-01/index.html"],
      sql: ["SELECT 'A database protects shared truth' AS note;", "SELECT 'Countries, regions, and cities need relationships' AS note;"],
      result: "You can explain the problem a database solves before naming any syntax.",
      breakage: "Without this lesson, later design choices feel like arbitrary commands instead of responses to a real problem.",
      habit: "Start with the problem and the data shape before choosing a tool.",
    };
  }
  if (title.includes("tables, rows")) {
    return {
      objective: "Describe tables, rows, columns, and schemas using a country dataset.",
      concept: "Tables are named containers for related rows, and each row represents one record in that container.",
      postgres: "In PostgreSQL, a schema groups tables together so a project can stay organized as it grows.",
      lab: "Sketch a countries table and label which facts belong in rows versus columns.",
      files: ["docs/sessions/session-02/index.html", "docs/schema-notes/index.html"],
      sql: ["CREATE TABLE countries (country_id integer, country_name text, continent text);", "SELECT country_name, continent FROM countries;"],
      result: "You can look at a table and explain what each axis means.",
      breakage: "If rows and columns are unclear, later join and constraint lessons become confusing.",
      habit: "Name the shape of data before deciding how to store it.",
    };
  }
  if (title.includes("primary keys")) {
    return {
      objective: "Show why each row needs a stable identity in the countries table.",
      concept: "A primary key makes one row distinct from every other row, even when names look similar.",
      postgres: "PostgreSQL enforces primary keys so duplicate identities cannot sneak in unnoticed.",
      lab: "Design a countries table that can survive duplicate country names or renamed records.",
      files: ["docs/sessions/session-03/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE countries (country_id integer PRIMARY KEY, country_name text);", "SELECT country_id, country_name FROM countries;"],
      result: "You can explain why a natural name is usually not enough to identify a row.",
      breakage: "Without a primary key, updates and relationships become fragile.",
      habit: "Protect identity early instead of hoping names will stay unique forever.",
    };
  }
  if (title.includes("data types")) {
    return {
      objective: "Choose the right data type and explain what NULL means.",
      concept: "Data types tell the database what kind of value belongs in each column, while NULL means the value is unknown or missing.",
      postgres: "PostgreSQL validates types on insert and update, which helps catch bad data before it spreads.",
      lab: "Add typed columns to a country table and identify which columns should allow NULL.",
      files: ["docs/sessions/session-04/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE countries (country_id integer, country_name text, population integer, independence_date date);", "SELECT population, independence_date FROM countries;"],
      result: "You can explain why type choice is part of design, not just syntax.",
      breakage: "Wrong types make queries awkward and can hide bad data.",
      habit: "Choose the smallest correct type that matches the real-world fact.",
    };
  }
  if (title.includes("what postgresql is")) {
    return {
      objective: "Explain what PostgreSQL does and how psql fits the learning workflow.",
      concept: "PostgreSQL is the database engine, and psql is one of the tools used to talk to it.",
      postgres: "psql can connect, inspect objects, and run SQL without any application layer in the way.",
      lab: "Practice the connect-inspect-query loop with a tiny local database.",
      files: ["docs/sessions/session-05/index.html", "README.md"],
      sql: ["SELECT version();", "SELECT current_database();"],
      result: "You can connect to a database and confirm what server you are using.",
      breakage: "If the toolchain is fuzzy, later lessons will feel magical instead of mechanical.",
      habit: "Always verify the environment before changing data.",
    };
  }
  if (title.includes("select, from")) {
    return {
      objective: "Read a basic query and explain how aliases change readability.",
      concept: "SELECT chooses columns, FROM chooses the source table, and aliases give shorter names for the same data source.",
      postgres: "PostgreSQL evaluates the query shape first, then returns the requested columns from the named source.",
      lab: "Write a query that reads country names and continent names from a simple table.",
      files: ["docs/sessions/session-06/index.html", "docs/query-notes/index.html"],
      sql: ["SELECT country_name FROM countries;", "SELECT c.country_name AS country FROM countries AS c;"],
      result: "You can read a query line by line without guessing.",
      breakage: "Without the SELECT/FROM mental model, later filters and joins are hard to follow.",
      habit: "Make queries readable before making them clever.",
    };
  }
  if (title.includes("where and comparison")) {
    return {
      objective: "Filter rows with WHERE and comparison operators.",
      concept: "WHERE keeps only rows that meet a condition, so SQL can focus on the records that matter.",
      postgres: "PostgreSQL applies the filter before returning the final result set, which keeps the answer precise.",
      lab: "Find countries from one continent and explain why the other rows are excluded.",
      files: ["docs/sessions/session-07/index.html", "docs/query-notes/index.html"],
      sql: ["SELECT country_name FROM countries WHERE continent = 'Africa';", "SELECT country_name FROM countries WHERE population > 100000000;"],
      result: "You can predict which rows stay in the result.",
      breakage: "If filtering is weak, later joins and reports will include too much noise.",
      habit: "State the rule before writing the filter.",
    };
  }
  if (title.includes("order by")) {
    return {
      objective: "Sort country data and limit the result set.",
      concept: "ORDER BY arranges rows, and LIMIT trims the list to the first few results.",
      postgres: "PostgreSQL sorts after building the candidate result set, then returns the requested slice.",
      lab: "Show the largest countries first and the smallest result set needed for a report.",
      files: ["docs/sessions/session-08/index.html", "docs/query-notes/index.html"],
      sql: ["SELECT country_name, population FROM countries ORDER BY population DESC;", "SELECT country_name FROM countries ORDER BY country_name ASC LIMIT 5;"],
      result: "You can explain why ordering changes the presentation but not the underlying facts.",
      breakage: "Without order control, reports feel random.",
      habit: "Separate finding data from presenting data.",
    };
  }
  if (title.includes("insert")) {
    return {
      objective: "Insert new country rows carefully and explain what a successful insert changes.",
      concept: "INSERT adds new rows, and each column value must fit the table definition.",
      postgres: "PostgreSQL checks types and constraints before it accepts the new row.",
      lab: "Add a few countries to the table and confirm the rows are really there.",
      files: ["docs/sessions/session-09/index.html", "db/seed.sql"],
      sql: ["INSERT INTO countries (country_name, continent) VALUES ('Japan', 'Asia');", "SELECT country_name, continent FROM countries;"],
      result: "You can create a record without guessing how the table stores it.",
      breakage: "If inserts are not understood, later seed files and migrations become risky.",
      habit: "Insert with intention, not by accident.",
    };
  }
  if (title.includes("update and delete")) {
    return {
      objective: "Change and remove rows without breaking the model.",
      concept: "UPDATE edits existing rows, and DELETE removes rows that no longer belong.",
      postgres: "PostgreSQL treats row changes as real data mutations, so filters matter a lot more than in a spreadsheet.",
      lab: "Update one country fact and delete one fake row using a narrow WHERE clause.",
      files: ["docs/sessions/session-10/index.html", "db/queries/update-country.sql"],
      sql: ["UPDATE countries SET continent = 'Oceania' WHERE country_name = 'New Zealand';", "DELETE FROM countries WHERE country_name = 'Exampleland';"],
      result: "You can predict exactly which row will change before running the command.",
      breakage: "Broad UPDATE or DELETE commands can damage data very quickly.",
      habit: "Always rehearse the WHERE clause before mutating data.",
    };
  }
  if (title.includes("creating a database")) {
    return {
      objective: "Create a database and inspect its basic metadata.",
      concept: "A PostgreSQL database is a container for related schemas, tables, and objects.",
      postgres: "psql can create and inspect databases so you can verify the environment before building schema.",
      lab: "Create the learning database and inspect it with psql commands.",
      files: ["docs/sessions/session-11/index.html", "db/README.md"],
      sql: ["CREATE DATABASE country_learning;", "\\l", "\\c country_learning"],
      result: "You know how to create and enter the working database.",
      breakage: "Without this step, later schema work has nowhere stable to live.",
      habit: "Verify the workspace before you start modeling.",
    };
  }
  if (title.includes("creating tables")) {
    return {
      objective: "Create a first table and inspect its columns.",
      concept: "Tables are the core relational structure where rows and columns live.",
      postgres: "PostgreSQL stores table definitions as part of the schema, and psql can describe those definitions.",
      lab: "Create a countries table and inspect it with describe commands.",
      files: ["docs/sessions/session-12/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE countries (country_id integer, country_name text, continent text);", "\\d countries"],
      result: "You can prove the table exists and explain its columns.",
      breakage: "If table creation is not understood, later constraints have nowhere to attach.",
      habit: "Check the shape of the object you just created.",
    };
  }
  if (title.includes("text, varchar")) {
    return {
      objective: "Compare common text and numeric types in PostgreSQL.",
      concept: "Type choice communicates both meaning and limits for each column.",
      postgres: "PostgreSQL accepts several text and numeric options, and each one has tradeoffs worth understanding.",
      lab: "Refine the country table so columns use a type that matches the data.",
      files: ["docs/sessions/session-13/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE countries (country_name text, iso_code varchar(3), population integer, gdp numeric);", "SELECT country_name, iso_code, population, gdp FROM countries;"],
      result: "You can explain why a type choice is part of table design.",
      breakage: "Poor type choices make validation and reporting harder.",
      habit: "Match the type to the real-world unit of data.",
    };
  }
  if (title.includes("boolean, date, time")) {
    return {
      objective: "Use boolean and temporal columns correctly.",
      concept: "Boolean values are yes/no facts, while date and time types capture when something happened.",
      postgres: "PostgreSQL keeps date and time values distinct so reports can filter them cleanly.",
      lab: "Store a few country facts such as membership status or independence dates.",
      files: ["docs/sessions/session-14/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE country_events (country_name text, is_un_member boolean, independence_date date);", "SELECT country_name, is_un_member, independence_date FROM country_events;"],
      result: "You can pick between boolean, date, time, and timestamp on purpose.",
      breakage: "If temporal types are vague, timelines and audits become unreliable.",
      habit: "Be precise about time because time is easy to misread.",
    };
  }
  if (title.includes("serial vs identity")) {
    return {
      objective: "Explain automatically generated ids and safe table removal.",
      concept: "Identity columns can generate row ids for you, while dropping tables should be deliberate.",
      postgres: "PostgreSQL supports both older serial patterns and newer identity columns, and each needs context.",
      lab: "Create a table that auto-generates ids and then practice safe dropping in a sandbox.",
      files: ["docs/sessions/session-15/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE countries (country_id integer GENERATED ALWAYS AS IDENTITY, country_name text);", "DROP TABLE IF EXISTS countries;"],
      result: "You know how PostgreSQL can generate row ids and remove objects safely.",
      breakage: "Without careful dropping, accidental data loss becomes more likely.",
      habit: "Make destructive actions explicit and reversible when possible.",
    };
  }
  if (title.includes("entities and attributes")) {
    return {
      objective: "Turn country requirements into entities and attributes.",
      concept: "An entity is a real-world thing we want to store, and an attribute is one fact about that thing.",
      postgres: "PostgreSQL tables often map neatly to entities, while columns capture the attributes of each entity.",
      lab: "Draft the first country model with countries as the core entity.",
      files: ["docs/sessions/session-16/index.html", "docs/schema-notes/index.html"],
      sql: ["CREATE TABLE countries (country_id integer PRIMARY KEY, country_name text, continent text);"],
      result: "You can separate the thing itself from the facts about the thing.",
      breakage: "If entities and attributes blur together, the model gets messy quickly.",
      habit: "Model the real world before you model the table.",
    };
  }
  if (title.includes("regions and continents")) {
    return {
      objective: "Introduce geography tables that support the country model.",
      concept: "Regions and continents are separate concepts, even if people often mix them up casually.",
      postgres: "Separate tables let the database preserve that distinction instead of repeating labels everywhere.",
      lab: "Create region and continent reference tables and connect them to countries later.",
      files: ["docs/sessions/session-17/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE continents (continent_id integer PRIMARY KEY, continent_name text UNIQUE);", "SELECT continent_name FROM continents;"],
      result: "You can explain why two similar-sounding concepts may still need separate tables.",
      breakage: "If geography categories are merged too early, later joins get awkward.",
      habit: "Ask whether two ideas are truly the same before combining them.",
    };
  }
  if (title.includes("one-to-many")) {
    return {
      objective: "Model one country-to-many cities or regions relationships.",
      concept: "One parent row can be referenced by many child rows when the relationship is naturally hierarchical.",
      postgres: "Foreign keys make one-to-many relationships explicit and enforceable in PostgreSQL.",
      lab: "Add a child table that points back to countries.",
      files: ["docs/sessions/session-18/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE cities (city_id integer PRIMARY KEY, country_id integer REFERENCES countries(country_id), city_name text);"],
      result: "You can explain why child rows should point back to their parent row.",
      breakage: "Without one-to-many modeling, duplicated parent facts spread everywhere.",
      habit: "Put shared facts in the parent table, not in every child row.",
    };
  }
  if (title.includes("many-to-many")) {
    return {
      objective: "Use a join table to model many-to-many relationships.",
      concept: "Many-to-many means both sides can connect to many rows on the other side, so a bridge table is needed.",
      postgres: "PostgreSQL handles join tables naturally with two foreign keys and a clean primary key strategy.",
      lab: "Model languages spoken in multiple countries through a bridge table.",
      files: ["docs/sessions/session-19/index.html", "db/schema.sql"],
      sql: ["CREATE TABLE languages (language_id integer PRIMARY KEY, language_name text UNIQUE);", "CREATE TABLE country_languages (country_id integer REFERENCES countries(country_id), language_id integer REFERENCES languages(language_id));"],
      result: "You can explain why a bridge table exists instead of repeating data.",
      breakage: "Without a join table, many-to-many data turns into duplication.",
      habit: "Use a bridge table when either side can have many matches.",
    };
  }
  if (title.includes("normalization")) {
    return {
      objective: "Explain normalization and naming conventions in plain English.",
      concept: "Normalization reduces duplication by moving repeated facts to the right table.",
      postgres: "PostgreSQL does not normalize for you; it stores exactly the shape you design.",
      lab: "Review the country model and identify one repeated fact that should move elsewhere.",
      files: ["docs/sessions/session-20/index.html", "docs/schema-notes/index.html"],
      sql: ["SELECT country_name, continent FROM countries;", "-- look for repeated values that should be normalized"],
      result: "You can spot duplicated facts and explain why they are risky.",
      breakage: "If normalization is ignored, updates can drift apart.",
      habit: "Prefer one authoritative location for each fact.",
    };
  }
  if (title.includes("primary key and not null")) {
    return {
      objective: "Use primary key and NOT NULL constraints to protect core facts.",
      concept: "Primary keys identify rows, and NOT NULL forces important columns to always have a value.",
      postgres: "PostgreSQL enforces both constraints every time a row is inserted or changed.",
      lab: "Add constraints to the countries table and try an invalid insert.",
      files: ["docs/sessions/session-21/index.html", "db/schema.sql", "db/tests/constraints.sql"],
      sql: ["ALTER TABLE countries ADD PRIMARY KEY (country_id);", "ALTER TABLE countries ALTER COLUMN country_name SET NOT NULL;"],
      result: "You can explain how constraints protect the model before bad data lands.",
      breakage: "Without these rules, important rows can go missing or collide.",
      habit: "Let the database enforce the rules that should never be broken.",
    };
  }
  if (title.includes("unique, default, and check")) {
    return {
      objective: "Use uniqueness, defaults, and checks to make the model safer.",
      concept: "UNIQUE prevents duplicates, DEFAULT fills in common values, and CHECK enforces allowed values.",
      postgres: "PostgreSQL validates all three at write time, which makes the table more trustworthy.",
      lab: "Add a uniqueness rule for country codes and a check for a valid continent list.",
      files: ["docs/sessions/session-22/index.html", "db/schema.sql"],
      sql: ["ALTER TABLE countries ADD CONSTRAINT countries_iso_code_unique UNIQUE (iso_code);", "ALTER TABLE countries ADD CONSTRAINT countries_continent_check CHECK (continent IN ('Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'));"],
      result: "You can explain why each constraint protects a different kind of mistake.",
      breakage: "Without these rules, duplicates and impossible values slip through.",
      habit: "Pick the lightest constraint that still protects the real rule.",
    };
  }
  if (title.includes("foreign keys and referential actions")) {
    return {
      objective: "Connect tables with foreign keys and explain delete behavior.",
      concept: "Foreign keys keep child rows pointed at valid parent rows.",
      postgres: "PostgreSQL can block, cascade, or null out related rows depending on the rule you choose.",
      lab: "Connect cities to countries and test what happens when a parent is deleted.",
      files: ["docs/sessions/session-23/index.html", "db/schema.sql", "db/tests/foreign-keys.sql"],
      sql: ["ALTER TABLE cities ADD CONSTRAINT cities_country_fk FOREIGN KEY (country_id) REFERENCES countries(country_id) ON DELETE RESTRICT;", "SELECT city_name FROM cities;"],
      result: "You can explain how referential actions protect related rows.",
      breakage: "Without foreign keys, orphan rows appear easily.",
      habit: "Protect the relationship, not just the individual table.",
    };
  }
  if (title.includes("integrity failure cases")) {
    return {
      objective: "Predict what goes wrong when integrity rules are missing.",
      concept: "Integrity means the data stays internally consistent as rows change over time.",
      postgres: "PostgreSQL surfaces integrity failures early so you can catch bad operations before they spread.",
      lab: "Try a few bad inserts or deletes and observe the failure messages.",
      files: ["docs/sessions/session-24/index.html", "docs/schema-notes/index.html", "db/tests/constraints.sql"],
      sql: ["INSERT INTO cities (city_id, country_id, city_name) VALUES (1, 999, 'Ghost City');", "DELETE FROM countries WHERE country_id = 1;"],
      result: "You can explain the difference between valid structure and valid relationships.",
      breakage: "If integrity failures are ignored, the model slowly becomes untrustworthy.",
      habit: "Read the error message as part of the design feedback loop.",
    };
  }
  if (title.includes("inner join")) {
    return {
      objective: "Use INNER JOIN to combine related country and city rows.",
      concept: "INNER JOIN keeps only rows with matching values on both sides.",
      postgres: "PostgreSQL joins tables by comparing the key columns you specify in the ON clause.",
      lab: "Show countries alongside the cities that belong to them.",
      files: ["docs/sessions/session-25/index.html", "db/queries/joins.sql", "docs/query-notes/index.html"],
      sql: ["SELECT c.country_name, ci.city_name FROM countries c INNER JOIN cities ci ON ci.country_id = c.country_id;"],
      result: "You can predict why unmatched rows disappear from an inner join.",
      breakage: "Without the join mental model, multi-table reports look mysterious.",
      habit: "Think about matching rows before writing the query.",
    };
  }
  if (title.includes("left join")) {
    return {
      objective: "Use LEFT JOIN to keep every parent row visible.",
      concept: "LEFT JOIN keeps all rows from the left table, even when the right side has no match.",
      postgres: "PostgreSQL fills unmatched right-side columns with NULL in a left join.",
      lab: "List countries even when no city rows exist yet.",
      files: ["docs/sessions/session-26/index.html", "db/queries/joins.sql"],
      sql: ["SELECT c.country_name, ci.city_name FROM countries c LEFT JOIN cities ci ON ci.country_id = c.country_id;"],
      result: "You can explain why NULL appears in the result set.",
      breakage: "Without left joins, reports can hide missing child data.",
      habit: "Choose the join that preserves the rows you care about most.",
    };
  }
  if (title.includes("right join")) {
    return {
      objective: "Understand RIGHT JOIN and FULL OUTER JOIN as mirror and union cases.",
      concept: "RIGHT JOIN preserves the opposite side, and FULL OUTER JOIN keeps rows from both tables.",
      postgres: "PostgreSQL supports both, though many teams prefer left joins for readability.",
      lab: "Compare join direction and see how the row set changes.",
      files: ["docs/sessions/session-27/index.html", "db/queries/joins.sql"],
      sql: ["SELECT c.country_name, ci.city_name FROM countries c RIGHT JOIN cities ci ON ci.country_id = c.country_id;", "SELECT c.country_name, ci.city_name FROM countries c FULL OUTER JOIN cities ci ON ci.country_id = c.country_id;"],
      result: "You can explain what each join keeps and what it discards.",
      breakage: "If direction is ignored, the result can be harder to reason about than necessary.",
      habit: "Use the join type that makes the preserved side obvious.",
    };
  }
  if (title.includes("cross join")) {
    return {
      objective: "Use CROSS JOIN and self joins carefully.",
      concept: "CROSS JOIN pairs every row with every other row, and self joins compare rows in the same table.",
      postgres: "PostgreSQL will happily produce the full combination set if you ask for it, so intent matters.",
      lab: "Build combinations of continents and years, then compare two cities from the same table.",
      files: ["docs/sessions/session-28/index.html", "db/queries/joins.sql"],
      sql: ["SELECT continent_name, year_label FROM continents CROSS JOIN years;", "SELECT a.city_name, b.city_name FROM cities a JOIN cities b ON a.country_id = b.country_id AND a.city_id <> b.city_id;"],
      result: "You can predict when a query explodes into many rows.",
      breakage: "Without caution, cross joins can create accidental combinatorial output.",
      habit: "Check row multiplication before you run the query.",
    };
  }
  if (title.includes("count and sum")) {
    return {
      objective: "Count rows and add numeric values for summaries.",
      concept: "COUNT tells you how many rows exist, and SUM adds values together.",
      postgres: "PostgreSQL aggregates values after filtering and joining, so the row set matters first.",
      lab: "Count countries and sum a simple population column.",
      files: ["docs/sessions/session-29/index.html", "docs/query-notes/index.html"],
      sql: ["SELECT COUNT(*) FROM countries;", "SELECT SUM(population) FROM countries;"],
      result: "You can explain the difference between counting rows and counting a column.",
      breakage: "If aggregates are misunderstood, reports will be wrong even when the query runs.",
      habit: "Check whether you are counting rows or values.",
    };
  }
  if (title.includes("avg, min, and max")) {
    return {
      objective: "Summarize a numeric column with average, minimum, and maximum.",
      concept: "AVG, MIN, and MAX show the center and the edges of a numeric set.",
      postgres: "PostgreSQL computes these aggregates directly in SQL, which keeps summaries close to the data.",
      lab: "Report the smallest, largest, and average population for the sample countries.",
      files: ["docs/sessions/session-30/index.html", "docs/query-notes/index.html"],
      sql: ["SELECT AVG(population), MIN(population), MAX(population) FROM countries;"],
      result: "You can explain what each aggregate says about the data.",
      breakage: "If the wrong aggregate is chosen, the summary can mislead readers.",
      habit: "Pick the statistic that matches the question.",
    };
  }
  if (title.includes("group by")) {
    return {
      objective: "Group rows by a shared value and summarize each group.",
      concept: "GROUP BY turns many rows into one result per category.",
      postgres: "PostgreSQL requires grouped columns and aggregate columns to work together cleanly.",
      lab: "Count countries by continent and compare the groups.",
      files: ["docs/sessions/session-31/index.html", "docs/query-notes/index.html"],
      sql: ["SELECT continent, COUNT(*) FROM countries GROUP BY continent;"],
      result: "You can explain why grouped results have fewer rows than the source table.",
      breakage: "If grouping is fuzzy, reports will mix categories together.",
      habit: "Define the grouping key before asking for totals.",
    };
  }
  if (title.includes("having")) {
    return {
      objective: "Filter grouped results with HAVING.",
      concept: "HAVING filters after grouping, so it can remove whole summary rows.",
      postgres: "PostgreSQL applies HAVING after GROUP BY, which is different from WHERE.",
      lab: "Show only continents with more than one country in the sample data.",
      files: ["docs/sessions/session-32/index.html", "docs/query-notes/index.html"],
      sql: ["SELECT continent, COUNT(*) FROM countries GROUP BY continent HAVING COUNT(*) > 1;"],
      result: "You can explain why WHERE and HAVING do different jobs.",
      breakage: "Without that distinction, grouped reports become hard to tune.",
      habit: "Filter raw rows with WHERE and grouped rows with HAVING.",
    };
  }
  if (title.includes("seed files")) {
    return {
      objective: "Separate schema from repeatable seed data.",
      concept: "Seed files are repeatable inputs that let every developer start from the same data shape.",
      postgres: "PostgreSQL can load seed SQL directly, which makes local learning environments reproducible.",
      lab: "Write a seed file for a small set of countries and regions.",
      files: ["db/schema.sql", "db/seed.sql", "db/mock/countries.csv", "docs/labs/index.html"],
      sql: ["INSERT INTO countries (country_name, continent) VALUES ('Japan', 'Asia');", "INSERT INTO countries (country_name, continent) VALUES ('Brazil', 'South America');"],
      result: "You can explain the difference between schema and repeatable data.",
      breakage: "Without seed discipline, examples drift from machine to machine.",
      habit: "Keep setup data reproducible and separate from the schema itself.",
    };
  }
  if (title.includes("csv import")) {
    return {
      objective: "Load local mock data and reset the database consistently.",
      concept: "CSV import gives teams a simple way to populate test data, while reset scripts make the process repeatable.",
      postgres: "PostgreSQL can import CSV data and run reset-friendly SQL scripts in a predictable order.",
      lab: "Import the mock countries file and rebuild the database from scratch.",
      files: ["db/reset.sql", "db/mock/countries.csv", "docs/labs/index.html"],
      sql: ["\\copy countries(country_name, continent) FROM 'db/mock/countries.csv' WITH (FORMAT csv, HEADER true);", "DROP TABLE IF EXISTS countries;"],
      result: "You can reset the learning database without manual cleanup.",
      breakage: "Without reset scripts, every fresh start becomes a separate puzzle.",
      habit: "Make the learning environment easy to restart.",
    };
  }
  if (title.includes("testing inserts")) {
    return {
      objective: "Test that inserts and constraints behave the way you expect.",
      concept: "Database tests confirm that rules still hold after changes.",
      postgres: "PostgreSQL exposes errors clearly enough that simple SQL tests can check success and failure cases.",
      lab: "Try a valid insert and an invalid insert, then compare the results.",
      files: ["db/tests/constraints.sql", "docs/quizzes/index.html"],
      sql: ["INSERT INTO countries (country_name, continent) VALUES ('Canada', 'North America');", "INSERT INTO countries (country_name, continent) VALUES (NULL, 'North America');"],
      result: "You can test a rule instead of only assuming it works.",
      breakage: "Without tests, regressions can remove protections silently.",
      habit: "Prove the rule with both success and failure cases.",
    };
  }
  if (title.includes("testing joins")) {
    return {
      objective: "Test that join queries return the rows you expect.",
      concept: "A join test should prove both the happy path and the missing-match path.",
      postgres: "PostgreSQL joins are predictable once the keys and cardinality are understood.",
      lab: "Check join results for countries with cities and countries without cities.",
      files: ["db/tests/joins.sql", "docs/quizzes/index.html"],
      sql: ["SELECT c.country_name, ci.city_name FROM countries c LEFT JOIN cities ci ON ci.country_id = c.country_id;"],
      result: "You can tell whether a join hides or preserves missing relationships.",
      breakage: "Without query tests, a harmless refactor can change result shape.",
      habit: "Verify the shape of the result, not just that the query runs.",
    };
  }
  if (title.includes("begin, commit, and rollback")) {
    return {
      objective: "Use transactions to group related changes safely.",
      concept: "Transactions make multiple statements act like one unit of work.",
      postgres: "PostgreSQL keeps transaction boundaries explicit so you can commit good work or roll back mistakes.",
      lab: "Wrap a few changes in a transaction and reverse them once.",
      files: ["docs/sessions/session-37/index.html", "db/queries/transactions.sql"],
      sql: ["BEGIN;", "UPDATE countries SET continent = 'Europe' WHERE country_name = 'France';", "ROLLBACK;"],
      result: "You can describe when a change should be all-or-nothing.",
      breakage: "Without transactions, partial writes can leave the data half-changed.",
      habit: "Treat a related set of writes as one decision.",
    };
  }
  if (title.includes("atomicity and consistency")) {
    return {
      objective: "Explain atomicity and consistency using the country model.",
      concept: "Atomicity means all parts of a change succeed together, and consistency means the rules still hold afterward.",
      postgres: "PostgreSQL gives you the transaction tools to protect both ideas when writes fail.",
      lab: "Break a transaction on purpose and inspect the database afterward.",
      files: ["docs/sessions/session-38/index.html", "db/tests/transactions.sql"],
      sql: ["BEGIN;", "INSERT INTO countries (country_name, continent) VALUES ('Brokenland', 'Atlantis');", "ROLLBACK;"],
      result: "You can explain why failed work should not leak into the database.",
      breakage: "Without atomicity, partial progress can corrupt the picture of the data.",
      habit: "Check the final state after a failure, not just the failure itself.",
    };
  }
  if (title.includes("indexes and b-tree")) {
    return {
      objective: "Understand what an index is and when it helps.",
      concept: "An index is a separate data structure that helps the database find rows faster for some queries.",
      postgres: "PostgreSQL uses B-tree indexes by default for many common lookup patterns.",
      lab: "Create an index on a lookup column and compare the idea to a full table scan.",
      files: ["docs/sessions/session-39/index.html", "db/migrations/039-add-country-index.sql"],
      sql: ["CREATE INDEX countries_name_idx ON countries (country_name);", "SELECT country_name FROM countries WHERE country_name = 'Japan';"],
      result: "You can explain that indexes trade write cost for read speed.",
      breakage: "Without understanding indexes, performance advice becomes guesswork.",
      habit: "Ask what kind of lookup the query actually performs.",
    };
  }
  if (title.includes("explain")) {
    return {
      objective: "Read EXPLAIN output and understand the query planner at a beginner level.",
      concept: "EXPLAIN shows the planner's chosen steps, and EXPLAIN ANALYZE compares the plan to actual execution.",
      postgres: "PostgreSQL uses statistics to choose between scans, joins, and indexes, so the plan tells you what it expects.",
      lab: "Inspect a simple query plan and compare it to the table's shape.",
      files: ["docs/sessions/session-40/index.html", "docs/query-notes/index.html", "db/queries/explain.sql"],
      sql: ["EXPLAIN SELECT country_name FROM countries WHERE country_name = 'Japan';", "EXPLAIN ANALYZE SELECT country_name FROM countries WHERE country_name = 'Japan';"],
      result: "You can read the basic plan shape and connect it to the query.",
      breakage: "Without planner literacy, performance tuning becomes superstition.",
      habit: "Inspect before optimizing.",
    };
  }
  return {
    objective: `Understand ${session.title.toLowerCase()} in the country model.`,
    concept: "This lesson grows the country database in a small, dependency-safe step.",
    postgres: "PostgreSQL gives us the syntax and constraints to make that step durable.",
    lab: `Practice ${session.title.toLowerCase()} using a small, beginner-readable example.`,
    files: [`docs/sessions/session-${pad(session.n)}/index.html`],
    sql: ["SELECT 'follow the lesson template' AS note;"],
    result: "You can describe the new rule or query in your own words.",
    breakage: "Skipping this lesson would leave a hole in the model.",
    habit: "Keep the change tiny enough to understand completely.",
  };
}

function phaseIndex(phase) {
  return ["Foundations", "SQL Foundations", "PostgreSQL Basics", "Data Modeling", "Constraints", "Joins", "Aggregation", "Mock Data and Seeding", "Testing", "Transactions", "Indexes and Performance"].indexOf(phase);
}

function lessonPhaseInfo(phase) {
  const info = {
    "Foundations": ["What databases are", "Learn the problem a database solves before writing any SQL."],
    "SQL Foundations": ["Reading and writing queries", "Learn the query shape before manipulating rows."],
    "PostgreSQL Basics": ["Working with PostgreSQL", "Learn the toolchain, object lifecycle, and type system."],
    "Data Modeling": ["Country model design", "Turn requirements into related tables with clean boundaries."],
    "Constraints": ["Integrity rules", "Protect the data before relying on it for analysis."],
    "Joins": ["Combining tables", "Use foreign keys and join logic to read across tables."],
    "Aggregation": ["Summaries and reports", "Reduce many rows into counts and totals."],
    "Mock Data and Seeding": ["Repeatable local data", "Build reliable development data before production data exists."],
    "Testing": ["Database behavior checks", "Prove inserts, joins, and constraints behave correctly."],
    "Transactions": ["All-or-nothing changes", "Make related writes succeed or fail together."],
    "Indexes and Performance": ["Planner literacy", "Learn when indexes help and how EXPLAIN explains the plan."],
  };
  return info[phase] ?? ["Lesson phase", "A small, dependency-safe step in the learning sequence."];
}

function commandBlock(lines) {
  return `<pre class="code-block"><code>${lines.map(escapeHtml).join("\n")}</code></pre>`;
}

function quizBlock(session, answersVisible = false) {
  const q = quizFor(session);
  return `
    <div class="quiz-grid">
      ${q.map((item, idx) => `
        <article class="quiz-item">
          <h3>Question ${idx + 1}</h3>
          <p>${escapeHtml(item.question)}</p>
          <ul class="quiz-options">
            ${item.options.map((opt) => `<li>${escapeHtml(opt)}</li>`).join("")}
          </ul>
          <details ${answersVisible ? "open" : ""}>
            <summary>Answer check</summary>
            <p><strong>${escapeHtml(item.answerLabel)}.</strong> ${escapeHtml(item.explanation)}</p>
          </details>
        </article>
      `).join("")}
    </div>
  `;
}

function quizFor(session) {
  const title = session.title.toLowerCase();
  const focus = session.title;
  const base = (question, answerLabel, explanation, options) => ({ question, answerLabel, explanation, options });
  const generic = [
    base(
      `Why does ${focus} belong in the learning sequence before later database work?`,
      "A",
      "Because it removes a conceptual blind spot that later lessons depend on.",
      ["It removes a conceptual blind spot that later lessons depend on.", "It mainly improves query speed.", "It replaces the need for a schema.", "It only matters for large companies."]
    ),
    base(
      `What is the most likely risk if we skip ${focus.toLowerCase()}?`,
      "B",
      "The later model will have a missing rule or a weak mental model.",
      ["Nothing changes because PostgreSQL fills the gap automatically.", "The later model will have a missing rule or a weak mental model.", "All joins become invalid immediately.", "The database engine stops working."]
    ),
    base(
      `Which country-data habit does this lesson reinforce most?`,
      "C",
      "Think in terms of one clear rule, then encode it in SQL or schema.",
      ["Write more rows first and think later.", "Prefer the most advanced feature available.", "Think in terms of one clear rule, then encode it in SQL or schema.", "Avoid documenting anything until the end."]
    ),
    base(
      `If a teammate used a spreadsheet shortcut instead of this lesson, what would you warn them about?`,
      "D",
      "Spreadsheets can hide duplicated facts and missing constraints.",
      ["Spreadsheets are always slower in every situation.", "They never support formulas.", "They cannot store country data at all.", "They can hide duplicated facts and missing constraints."]
    ),
    base(
      `What should we be able to explain after the lab?`,
      "A",
      "The concept in plain English, not just the command sequence.",
      ["The concept in plain English, not just the command sequence.", "Only the keyboard shortcuts we used.", "Only the output row count.", "Only the commit message format."]
    ),
  ];

  if (title.includes("primary keys")) {
    generic[0] = base(
      "Why is a primary key more useful than country name alone?",
      "A",
      "Country names can repeat, change, or be written inconsistently.",
      ["Country names can repeat, change, or be written inconsistently.", "It makes the table easier to print.", "It removes the need for rows.", "It only matters for joins."]
    );
  }
  if (title.includes("where and comparison")) {
    generic[0] = base(
      "Why does WHERE matter before ORDER BY or LIMIT?",
      "B",
      "Filtering first removes rows that should never be considered for the result.",
      ["ORDER BY cannot work with WHERE.", "Filtering first removes rows that should never be considered for the result.", "It only changes column names.", "It is optional but equivalent to SELECT."]
    );
  }
  if (title.includes("inner join")) {
    generic[0] = base(
      "Why should the country and city tables be joined instead of repeating country names in every city row?",
      "C",
      "The join preserves one source of truth for the country facts.",
      ["Because joins always make queries faster.", "Because city rows need more columns.", "The join preserves one source of truth for the country facts.", "Because foreign keys are only a naming convention."]
    );
  }
  if (title.includes("group by")) {
    generic[0] = base(
      "Why does GROUP BY reduce many country rows into fewer summary rows?",
      "A",
      "It collects rows with the same grouping key into one aggregate result.",
      ["It collects rows with the same grouping key into one aggregate result.", "It deletes duplicate rows from the table.", "It always sorts alphabetically.", "It only works on text columns."]
    );
  }

  return generic;
}

function pageShell({ title, active, body, description = "PostgreSQL learning track" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="stylesheet" href="/docs/styles.css" />
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="topbar">
    <div class="container topbar-inner">
      <a class="brand" href="/docs/index.html">
        <span class="brand-mark">PG</span>
        <span>
          <strong>PostgreSQL Learning Track</strong>
          <small>Country edition</small>
        </span>
      </a>
      <nav class="nav">
        ${navItems.map(([label, href, key]) => `<a class="${key === active ? "active" : ""}" href="${href}">${label}</a>`).join("")}
      </nav>
    </div>
  </header>
  <main id="content" class="page">
    <div class="container">
      ${body}
    </div>
  </main>
</body>
</html>`;
}

function officialRefsForSession(session) {
  const refs = [
    ["PostgreSQL 18.4 documentation home", "https://www.postgresql.org/docs/current/index.html"],
  ];
  const n = session.n;

  if (n <= 5) {
    refs.push(["Getting Started", "https://www.postgresql.org/docs/current/tutorial-start.html"]);
    refs.push(["psql", "https://www.postgresql.org/docs/current/app-psql.html"]);
  }
  if (n >= 6 && n <= 10) {
    refs.push(["The SQL Language", "https://www.postgresql.org/docs/current/tutorial-sql.html"]);
    refs.push(["Data Manipulation", "https://www.postgresql.org/docs/current/dml.html"]);
    refs.push(["Queries", "https://www.postgresql.org/docs/current/queries.html"]);
  }
  if (n >= 11 && n <= 15) {
    refs.push(["Creating a Database", "https://www.postgresql.org/docs/current/tutorial-createdb.html"]);
    refs.push(["Accessing a Database", "https://www.postgresql.org/docs/current/tutorial-accessdb.html"]);
    refs.push(["Data Types", "https://www.postgresql.org/docs/current/datatype.html"]);
  }
  if (n >= 16 && n <= 24) {
    refs.push(["Data Definition", "https://www.postgresql.org/docs/current/ddl.html"]);
    refs.push(["Constraints", "https://www.postgresql.org/docs/current/ddl-constraints.html"]);
  }
  if (n >= 25 && n <= 28) {
    refs.push(["Table Expressions and Joins", "https://www.postgresql.org/docs/current/queries-table-expressions.html"]);
  }
  if (n >= 29 && n <= 32) {
    refs.push(["Aggregate Functions", "https://www.postgresql.org/docs/current/functions-aggregate.html"]);
    refs.push(["GROUP BY and HAVING", "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP"]);
  }
  if (n >= 33 && n <= 36) {
    refs.push(["COPY", "https://www.postgresql.org/docs/current/sql-copy.html"]);
    refs.push(["Regression Tests", "https://www.postgresql.org/docs/current/regress.html"]);
  }
  if (n >= 37 && n <= 38) {
    refs.push(["BEGIN", "https://www.postgresql.org/docs/current/sql-begin.html"]);
    refs.push(["COMMIT", "https://www.postgresql.org/docs/current/sql-commit.html"]);
    refs.push(["ROLLBACK", "https://www.postgresql.org/docs/current/sql-rollback.html"]);
    refs.push(["Concurrency Control", "https://www.postgresql.org/docs/current/mvcc.html"]);
  }
  if (n >= 39 && n <= 40) {
    refs.push(["Indexes", "https://www.postgresql.org/docs/current/indexes.html"]);
    refs.push(["Using EXPLAIN", "https://www.postgresql.org/docs/current/using-explain.html"]);
    refs.push(["Performance Tips", "https://www.postgresql.org/docs/current/performance-tips.html"]);
  }

  return refs;
}

function referencesPage() {
  const rows = [
    ["Core entry point", "PostgreSQL 18.4 documentation home", "https://www.postgresql.org/docs/current/index.html"],
    ["Getting started", "Tutorial: Getting Started", "https://www.postgresql.org/docs/current/tutorial-start.html"],
    ["Terminal workflow", "psql", "https://www.postgresql.org/docs/current/app-psql.html"],
    ["Basic SQL", "The SQL Language", "https://www.postgresql.org/docs/current/tutorial-sql.html"],
    ["Schema design", "Data Definition", "https://www.postgresql.org/docs/current/ddl.html"],
    ["Constraints", "Constraints", "https://www.postgresql.org/docs/current/ddl-constraints.html"],
    ["Queries and joins", "Table Expressions", "https://www.postgresql.org/docs/current/queries-table-expressions.html"],
    ["Data types", "Data Types", "https://www.postgresql.org/docs/current/datatype.html"],
    ["Aggregation", "Aggregate Functions", "https://www.postgresql.org/docs/current/functions-aggregate.html"],
    ["Transactions", "Concurrency Control", "https://www.postgresql.org/docs/current/mvcc.html"],
    ["Indexes", "Indexes", "https://www.postgresql.org/docs/current/indexes.html"],
    ["Plans", "Using EXPLAIN", "https://www.postgresql.org/docs/current/using-explain.html"],
  ];

  return pageShell({
    title: "References - PostgreSQL Learning Track",
    active: "references",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Upstream references</p>
        <h1>Official PostgreSQL documentation map</h1>
        <p class="lede">These are the core PostgreSQL documentation pages the curriculum is built around. As of 2026-06-30, the official current docs point to PostgreSQL 18.4.</p>
      </section>
      <section class="section">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Topic</th><th>Official page</th><th>Link</th></tr></thead>
            <tbody>
              ${rows.map(([topic, title, url]) => `<tr><td>${escapeHtml(topic)}</td><td>${escapeHtml(title)}</td><td><a href="${url}">${escapeHtml(url)}</a></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `,
  });
}

function docHome() {
  return pageShell({
    title: "PostgreSQL Learning Track",
    active: "home",
    description: "Static learning site for a country-themed PostgreSQL curriculum.",
    body: `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Documentation first. Understanding first.</p>
          <h1>Learn PostgreSQL by building a country database one concept at a time.</h1>
          <p class="lede">This repository is a static learning environment, not a feature sprint. The documentation is the source of truth, and every session teaches one beginner-readable slice of database thinking.</p>
          <div class="actions">
            <a class="button primary" href="/docs/syllabus/index.html">Open the syllabus</a>
            <a class="button" href="/docs/sessions/session-01/index.html">Start Session 01</a>
          </div>
        </div>
        <aside class="hero-panel">
          <div class="panel">
            <h2>Project rules</h2>
            <ul class="bullets">
              <li>One session, one concept, one commit.</li>
              <li>Docs must change before code or SQL.</li>
              <li>Quiz before lab, then the same quiz after.</li>
              <li>Beginner-readable SQL only.</li>
            </ul>
          </div>
          <div class="panel compass">
            <div class="compass-ring">*</div>
            <p>Country data gives us a familiar way to talk about tables, keys, joins, constraints, and transactions without hiding the core database ideas.</p>
          </div>
        </aside>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <p class="eyebrow">Start here</p>
            <h2>What lives in this repo</h2>
          </div>
          <p>The pages below are the learning map. They explain the progression, the lesson format, the prompt archive, and the review flow that future AI sessions should follow before making changes.</p>
        </div>
        <div class="card-grid four">
          <a class="card" href="/docs/syllabus/index.html"><strong>Syllabus</strong><span>Dependency order for the full 40-session track.</span></a>
          <a class="card" href="/docs/sessions/index.html"><strong>Sessions</strong><span>Every lesson page in order, grouped by phase.</span></a>
          <a class="card" href="/docs/prompts/index.html"><strong>Prompt archive</strong><span>Major project instructions and what changed because of them.</span></a>
          <a class="card" href="/docs/architecture/index.html"><strong>Architecture</strong><span>How future AI sessions should initialize and work.</span></a>
        </div>
      </section>

      <section class="section split">
        <div class="panel">
          <p class="eyebrow">Curriculum design</p>
          <h2>Learning progression</h2>
          <p>The course starts with the problem databases solve, then moves through SQL reading and writing, PostgreSQL basics, data modeling, constraints, joins, aggregates, seed data, testing, transactions, indexes, and query planning.</p>
        </div>
        <div class="panel">
          <p class="eyebrow">Documentation promise</p>
          <h2>Docs are the source of truth</h2>
          <p>If a future change conflicts with the docs, the docs are updated first. No schema, seed, query, or application work should appear without a matching learning note and commit review.</p>
        </div>
      </section>
      <section class="section">
        <div class="panel">
          <p class="eyebrow">Official source</p>
          <h2>Built against the PostgreSQL docs</h2>
          <p>This curriculum uses the official PostgreSQL documentation as its upstream technical reference. See <a href="/docs/references/index.html">the references page</a> for the current doc set and core chapter links.</p>
        </div>
      </section>
    `,
  });
}

function syllabusPage() {
  const rows = phases.map((phase) => {
    const range = sessions.filter((s) => s.phase === phase.name);
    return `<tr><td>${escapeHtml(phase.name)}</td><td>${phase.range}</td><td>${escapeHtml(phase.summary)}</td><td>${escapeHtml(range[0].title)} → ${escapeHtml(range[range.length - 1].title)}</td></tr>`;
  }).join("");
  return pageShell({
    title: "Syllabus - PostgreSQL Learning Track",
    active: "syllabus",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Curriculum map</p>
        <h1>40-session progression</h1>
        <p class="lede">The syllabus shows the dependency order for the whole course. Later phases stay locked conceptually until earlier ones make sense.</p>
      </section>
      <section class="section">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Phase</th><th>Sessions</th><th>What it teaches</th><th>Boundary example</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Dependency rule</h2>
          <p>Every later lesson depends on the mental model created by earlier lessons. We do not teach performance before query shape, or joins before foreign keys.</p>
        </div>
        <div class="panel">
          <h2>Completion rule</h2>
          <p>Each session is a tiny slice that fits into one commit and one review. If the quiz score is below the target, the lesson repeats instead of moving on.</p>
        </div>
      </section>
    `,
  });
}

function sessionsPage() {
  const rows = sessions.map((session) => {
    const link = `/docs/sessions/session-${pad(session.n)}/index.html`;
    return `<tr><td>${pad(session.n)}</td><td>${escapeHtml(session.phase)}</td><td>${escapeHtml(session.title)}</td><td><a href="${link}">Open</a></td></tr>`;
  }).join("");
  return pageShell({
    title: "Sessions - PostgreSQL Learning Track",
    active: "sessions",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Lesson index</p>
        <h1>The full session path</h1>
        <p class="lede">Use this page as the map of the whole curriculum. Each session page follows the same teaching scaffold so the learning rhythm stays predictable.</p>
      </section>
      <section class="section">
        <div class="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Phase</th><th>Session title</th><th>Page</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    `,
  });
}

function lessonsPage() {
  return pageShell({
    title: "Lessons - PostgreSQL Learning Track",
    active: "lessons",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Lesson anatomy</p>
        <h1>Every lesson uses the same structure</h1>
        <p class="lede">That consistency makes the course easier to follow and easier to resume. The template is part of the teaching system.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Required sections</h2>
          <ol class="ordered">
            <li>Learning objective</li>
            <li>Concept explanation</li>
            <li>Underlying database or SQL concept</li>
            <li>PostgreSQL-specific explanation</li>
            <li>Five-question pre-lab quiz</li>
            <li>Lab objective and step-by-step instructions</li>
            <li>Expected files changed and SQL to run</li>
            <li>Expected result, checkpoint, checklist, and reflection</li>
          </ol>
        </div>
        <div class="panel">
          <h2>Why the template matters</h2>
          <p>The repeated structure keeps the learner oriented. The concept changes, but the reasoning path stays familiar so attention goes to the database idea instead of the page layout.</p>
        </div>
      </section>
      <section class="section">
        <div class="actions">
          <a class="button primary" href="/docs/sessions/session-01/index.html">Open Session 01</a>
          <a class="button" href="/docs/quizzes/index.html">Read quiz policy</a>
        </div>
      </section>
    `,
  });
}

function labsPage() {
  const rows = sessions.map((session) => `<tr><td>${pad(session.n)}</td><td>${escapeHtml(session.title)}</td><td>${escapeHtml(sessionTheme(session).lab)}</td></tr>`).join("");
  return pageShell({
    title: "Labs - PostgreSQL Learning Track",
    active: "labs",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Hands-on work</p>
        <h1>Lab index</h1>
        <p class="lede">Each lab is deliberately small. The goal is to prove the concept, not to ship a feature.</p>
      </section>
      <section class="section">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Session</th><th>Lesson</th><th>Lab objective</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    `,
  });
}

function quizzesPage() {
  return pageShell({
    title: "Quizzes - PostgreSQL Learning Track",
    active: "quizzes",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Assessment</p>
        <h1>Quiz policy</h1>
        <p class="lede">The learner should score at least 80 percent before moving forward. Questions test reasoning, not command recall.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>How the quiz works</h2>
          <p>Each session page includes the same five-question quiz before and after the lab. The repeated quiz checks whether the lab changed understanding, not just whether the learner can copy syntax.</p>
        </div>
        <div class="panel">
          <h2>What good questions look like</h2>
          <p>Good questions ask why a table, constraint, join, or transaction exists. They test the model behind the command rather than the command alone.</p>
        </div>
      </section>
      <section class="section">
        <div class="actions">
          <a class="button primary" href="/docs/sessions/session-01/index.html">Try the first quiz</a>
          <a class="button" href="/docs/lessons/index.html">Review lesson anatomy</a>
        </div>
      </section>
    `,
  });
}

function referencesPageLinkBlock(session) {
  const refs = officialRefsForSession(session);
  return `
    <div class="panel">
      <h2>Official PostgreSQL references</h2>
      <p>Read these upstream pages after the lesson concept is clear. They are reference material, not a replacement for the session flow.</p>
      <ul class="bullets">
        ${refs.map(([label, url]) => `<li><a href="${url}">${escapeHtml(label)}</a></li>`).join("")}
      </ul>
    </div>
  `;
}

function schemaNotesPage() {
  return pageShell({
    title: "Schema Notes - PostgreSQL Learning Track",
    active: "schema",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Schema notes</p>
        <h1>How we talk about tables and relationships</h1>
        <p class="lede">This page explains the design language behind the country database so future schema changes can be reviewed in plain English.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Design principle</h2>
          <p>Keep each fact in the table where it belongs. Shared facts go in parent tables, row-specific facts stay in child tables, and repeated values become reference tables when the model needs it.</p>
        </div>
        <div class="panel">
          <h2>Review question</h2>
          <p>If a column could be derived from another table, ask whether storing it twice would create update drift. If the answer is yes, the schema probably needs another relationship instead of another copy.</p>
        </div>
      </section>
    `,
  });
}

function queryNotesPage() {
  return pageShell({
    title: "Query Notes - PostgreSQL Learning Track",
    active: "queries",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Query notes</p>
        <h1>How we explain SQL</h1>
        <p class="lede">Every query example should say what it does, why it exists, and what shape of result it returns.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Reading rule</h2>
          <p>Start at SELECT, then read FROM, then read filters, joins, grouping, and sorting in the order PostgreSQL applies them conceptually.</p>
        </div>
        <div class="panel">
          <h2>Writing rule</h2>
          <p>Write the smallest correct query first. If the result is wrong, change the query shape before trying to make it prettier.</p>
        </div>
      </section>
    `,
  });
}

function architecturePage() {
  return pageShell({
    title: "Architecture - PostgreSQL Learning Track",
    active: "architecture",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Operating rules</p>
        <h1>How future AI sessions should initialize</h1>
        <p class="lede">Read the docs first, summarize the current state, then make the smallest possible change. The docs are the source of truth.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Startup order</h2>
          <ol class="ordered">
            <li>Read <code>AGENTS.md</code></li>
            <li>Read <code>README.md</code></li>
            <li>Read <code>docs/index.html</code></li>
            <li>Read the latest session note and commit review</li>
            <li>Read <code>docs/prompts/index.html</code></li>
            <li>Read the relevant lesson page</li>
            <li>Summarize what was read before touching files</li>
          </ol>
        </div>
        <div class="panel">
          <h2>Change order</h2>
          <ol class="ordered">
            <li>Update docs first.</li>
            <li>Keep the lesson slice tiny.</li>
            <li>Explain every SQL statement in plain English.</li>
            <li>Finish with a session note and commit review.</li>
          </ol>
        </div>
      </section>
      <section class="section">
        <div class="panel">
          <h2>Reference policy</h2>
          <p>When PostgreSQL behavior needs confirmation, use the official documentation as the primary source. This repo teaches from first principles, but it should anchor technical claims in the real upstream docs.</p>
        </div>
      </section>
    `,
  });
}

function sessionNotesPage() {
  return pageShell({
    title: "Session Notes - PostgreSQL Learning Track",
    active: "session-notes",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Session notes</p>
        <h1>What we learned after each lesson</h1>
        <p class="lede">This section will store brief learning notes after each session commits.</p>
      </section>
      <section class="section">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Session</th><th>Focus</th><th>Page</th></tr></thead>
            <tbody>
              <tr>
                <td>2026-06-30</td>
                <td>Pre-curriculum</td>
                <td>Initialize the learning system, docs structure, and 40-session scaffold.</td>
                <td><a href="/docs/session-notes/2026-06-30-initialization.html">Open note</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `,
  });
}

function commitReviewsPage() {
  return pageShell({
    title: "Commit Reviews - PostgreSQL Learning Track",
    active: "commit-reviews",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Commit reviews</p>
        <h1>What each commit should record</h1>
        <p class="lede">One session equals one commit, and the commit review captures the change as a learning checkpoint.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Review fields</h2>
          <ol class="ordered">
            <li>Lesson number and title</li>
            <li>Files changed</li>
            <li>Concept learned</li>
            <li>Commands run</li>
            <li>Verification result</li>
            <li>What we understand now</li>
            <li>What we are not allowed to do yet</li>
          </ol>
        </div>
        <div class="panel">
          <h2>Why this matters</h2>
          <p>Commit reviews keep the learning trail understandable after the code and docs have moved on. They turn each change into a reviewable checkpoint instead of a vague history line.</p>
        </div>
      </section>
      <section class="section">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Checkpoint</th><th>Summary</th><th>Page</th></tr></thead>
            <tbody>
              <tr>
                <td>2026-06-30</td>
                <td>Pre-curriculum initialization</td>
                <td>Created the docs-first static learning system and generated the full session scaffold.</td>
                <td><a href="/docs/commit-reviews/2026-06-30-initialization.html">Open review</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `,
  });
}

function initializationSessionNotePage() {
  return pageShell({
    title: "Initialization Session Note - PostgreSQL Learning Track",
    active: "session-notes",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Session note</p>
        <h1>2026-06-30 initialization note</h1>
        <p class="lede">This note captures the setup pass that turned the repository into a fresh docs-first PostgreSQL learning system.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>What changed</h2>
          <ul class="bullets">
            <li>Created a static documentation homepage and curriculum navigation.</li>
            <li>Generated all 40 session pages from one shared lesson template.</li>
            <li>Added prompt archive, architecture, references, and review sections.</li>
            <li>Added a lightweight <code>db/</code> folder scaffold without jumping ahead into real schema work.</li>
          </ul>
        </div>
        <div class="panel">
          <h2>What we understand now</h2>
          <ul class="bullets">
            <li>The docs are the source of truth for all future work.</li>
            <li>The course progression is dependency-first and intentionally slow.</li>
            <li>Every later lesson has a reserved home, even before its SQL files exist.</li>
          </ul>
        </div>
      </section>
      <section class="section">
        <div class="panel">
          <h2>What we are not allowed to do yet</h2>
          <p>We are not skipping ahead into application code, ORMs, dashboards, or advanced PostgreSQL features before the early table, query, and modeling lessons have actually been worked through.</p>
        </div>
      </section>
    `,
  });
}

function initializationCommitReviewPage() {
  return pageShell({
    title: "Initialization Commit Review - PostgreSQL Learning Track",
    active: "commit-reviews",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Commit review</p>
        <h1>Pre-curriculum initialization review</h1>
        <p class="lede">This review records the initial system-building change as a learning checkpoint rather than a feature drop.</p>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Files changed</h2>
          <ul class="bullets">
            <li><code>AGENTS.md</code> and <code>README.md</code></li>
            <li><code>docs/</code> static site scaffold and generated lesson pages</li>
            <li><code>db/</code> placeholder folder structure</li>
            <li><code>scripts/build-postgres-learning.mjs</code></li>
          </ul>
        </div>
        <div class="panel">
          <h2>Concept learned</h2>
          <p>A learning system needs operating rules, dependency order, and documentation structure before it needs product features.</p>
        </div>
      </section>
      <section class="section split">
        <div class="panel">
          <h2>Verification result</h2>
          <ul class="bullets">
            <li>The generator ran successfully and produced the docs tree.</li>
            <li>The home page, references page, and representative lesson pages were inspected.</li>
            <li>Lesson pages now include official PostgreSQL documentation links.</li>
          </ul>
        </div>
        <div class="panel">
          <h2>Not allowed yet</h2>
          <p>We should not mistake the scaffold for completed lessons. The structure is ready, but future sessions still need to earn each SQL file, schema change, test, and commit one lesson at a time.</p>
        </div>
      </section>
    `,
  });
}

function promptsPage() {
  return pageShell({
    title: "Prompts - PostgreSQL Learning Track",
    active: "prompts",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Prompt archive</p>
        <h1>Major instructions that shaped the project</h1>
        <p class="lede">The archive is append-only. Every major project prompt gets a page so future sessions can see what changed and why.</p>
      </section>
      <section class="section">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Prompt</th><th>Date</th><th>Session</th><th>Purpose</th><th>Archive</th></tr></thead>
            <tbody>
              <tr>
                <td>Project initialization</td>
                <td>2026-06-30</td>
                <td>Pre-curriculum</td>
                <td>Define the 40-session PostgreSQL learning track and the docs-first architecture.</td>
                <td><a href="/docs/prompts/2026-06-30-project-initialization.html">Open prompt page</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `,
  });
}

function promptDetailPage() {
  const text = `PostgreSQL Learning Track Project Initialization Prompt

Date: 2026-06-30
Session: Pre-Curriculum / Project Initialization

Goal
Create a complete PostgreSQL learning environment inside this repository.

Core rules
- Build a progressive, country-themed PostgreSQL project.
- Make docs the source of truth.
- Keep every lesson tiny, understandable, and committed separately.
- Do not skip conceptual prerequisites.
- Keep SQL beginner-readable.
- Update documentation before code or database work.

Curriculum shape
- Layer 1: database foundations
- Layer 2: SQL foundations
- Layer 3: PostgreSQL basics
- Layer 4: data modeling
- Layer 5: constraints and data integrity
- Layer 6: joins
- Layer 7: aggregation and analytics
- Layer 8: mock data and seeding
- Layer 9: testing database behavior
- Layer 10: transactions
- Layer 11: indexes and performance
- Layer 12: views, functions, and advanced SQL
- Layer 13: migrations and real-world workflow
- Layer 14: application integration

First task
Design the full 40-session curriculum, show dependency ordering, show the proposed repository structure, design the docs architecture, design the prompt archive system, explain the learning progression, explain how future AI sessions should initialize from the docs, and ask for approval before generating files.`;

  return pageShell({
    title: "Project Initialization Prompt - PostgreSQL Learning Track",
    active: "prompts",
    body: `
      <section class="page-heading">
        <p class="eyebrow">Prompt record</p>
        <h1>Project initialization prompt</h1>
        <p class="lede">This page preserves the major instruction that defined the repository's learning-first shape.</p>
      </section>
      <section class="section">
        <div class="panel">
          <pre class="code-block code-block-long"><code>${escapeHtml(text)}</code></pre>
        </div>
      </section>
    `,
  });
}

function phasesBySession() {
  const map = new Map();
  sessions.forEach((session) => {
    if (!map.has(session.phase)) map.set(session.phase, []);
    map.get(session.phase).push(session);
  });
  return [...map.entries()].map(([name, group]) => ({
    name,
    range: `${pad(group[0].n)}-${pad(group[group.length - 1].n)}`,
    summary: lessonPhaseInfo(name)[1],
  }));
}

const phases = phasesBySession();

function phasePill(phase) {
  return `<span class="phase-pill">${escapeHtml(phase)}</span>`;
}

function sessionPage(session) {
  const details = sessionTheme(session);
  const index = session.n - 1;
  const prev = sessions[index - 1];
  const next = sessions[index + 1];
  const phase = lessonPhaseInfo(session.phase);
  const quiz = quizBlock(session);
  const expectedFiles = details.files.map((file) => `<li><code>${escapeHtml(file)}</code></li>`).join("");
  const commands = commandBlock(details.sql);
  return pageShell({
    title: `Session ${pad(session.n)} - ${session.title}`,
    active: "sessions",
    description: `${session.title} in the PostgreSQL learning track.`,
    body: `
      <section class="session-hero">
        <div class="session-meta">
          ${phasePill(session.phase)}
          <span class="session-number">Session ${pad(session.n)}</span>
          <h1>${escapeHtml(session.title)}</h1>
          <p class="lede">${escapeHtml(details.objective)}</p>
          <div class="actions">
            ${prev ? `<a class="button" href="/docs/sessions/session-${pad(prev.n)}/index.html">Previous</a>` : ""}
            <a class="button primary" href="/docs/sessions/index.html">Back to session index</a>
            ${next ? `<a class="button" href="/docs/sessions/session-${pad(next.n)}/index.html">Next</a>` : ""}
          </div>
        </div>
        <aside class="session-side">
          <div class="panel">
            <h2>Learning objective</h2>
            <p>${escapeHtml(details.objective)}</p>
          </div>
          <div class="panel">
            <h2>What this lesson protects</h2>
            <p>${escapeHtml(details.breakage)}</p>
          </div>
        </aside>
      </section>

      <section class="section split">
        <div class="panel">
          <h2>Concept explanation</h2>
          <p>${escapeHtml(details.concept)}</p>
        </div>
        <div class="panel">
          <h2>Underlying database or SQL idea</h2>
          <p>${escapeHtml(phase[1])}</p>
        </div>
      </section>

      <section class="section">
        <div class="panel">
          <h2>PostgreSQL-specific explanation</h2>
          <p>${escapeHtml(details.postgres)}</p>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <p class="eyebrow">Pre-lab quiz</p>
            <h2>Five questions before the lab</h2>
          </div>
          <p>Answer these before the lab. Use the answer check only after you have made your choice.</p>
        </div>
        ${quiz}
      </section>

      <section class="section split">
        <div class="panel">
          <h2>Lab objective</h2>
          <p>${escapeHtml(details.lab)}</p>
          <h3>Step-by-step instructions</h3>
          <ol class="ordered">
            <li>Read the concept once more and explain it in one sentence.</li>
            <li>Open the session notes and identify the exact file or SQL change this lesson expects.</li>
            <li>Write or inspect the smallest possible example for the country model.</li>
            <li>Run the SQL commands in the order shown below.</li>
            <li>Check the result and compare it to the learning objective.</li>
          </ol>
        </div>
        <div class="panel">
          <h2>Expected files changed</h2>
          <ul class="bullets">${expectedFiles}</ul>
          <h3>Commit checkpoint</h3>
          <p>Use a commit title like <code>lesson-${pad(session.n)}-${slugify(session.title)}</code>.</p>
        </div>
      </section>

      <section class="section">
        <div class="panel">
          <h2>SQL commands to run</h2>
          ${commands}
          <h3>Expected output or result</h3>
          <p>${escapeHtml(details.result)}</p>
        </div>
      </section>

      <section class="section split">
        <div class="panel">
          <h2>Code and database review checklist</h2>
          <ul class="bullets">
            <li>Does the change stay within this lesson's tiny scope?</li>
            <li>Does the schema or query match the English explanation?</li>
            <li>Are we still using beginner-readable SQL?</li>
            <li>Can we explain what would break if this step disappeared?</li>
          </ul>
        </div>
        <div class="panel">
          <h2>Reflection questions</h2>
          <ul class="bullets">
            <li>What did this lesson teach us about the shape of data?</li>
            <li>What rule does PostgreSQL enforce for us now?</li>
            <li>What did we practice that real teams should keep doing?</li>
          </ul>
        </div>
      </section>

      <section class="section split">
        <div class="panel">
          <h2>Same quiz after the lab</h2>
          ${quizBlock(session, true)}
        </div>
        <div class="panel">
          <h2>What PostgreSQL concept we learned</h2>
          <p>${escapeHtml(session.title)}</p>
          <h3>What real-world engineering habit we practiced</h3>
          <p>${escapeHtml(details.habit)}</p>
          <h3>What could break if this code, schema, or query were removed</h3>
          <p>${escapeHtml(details.breakage)}</p>
        </div>
      </section>

      <section class="section">
        ${referencesPageLinkBlock(session)}
      </section>
    `,
  });
}

function rootIndex() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0; url=/docs/index.html" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PostgreSQL Learning Track</title>
</head>
<body>
  <p>Open <a href="/docs/index.html">the documentation home</a>.</p>
</body>
</html>`;
}

function stylesCss() {
  return `
:root {
  --bg: #f5efe4;
  --paper: #fbf8f2;
  --panel: #f8f3e9;
  --ink: #1c2a3d;
  --muted: #5d6776;
  --accent: #9a4d26;
  --accent-dark: #213b63;
  --accent-soft: #d9c7b4;
  --line: rgba(28, 42, 61, 0.14);
  --shadow: 0 18px 45px rgba(28, 42, 61, 0.08);
  --radius: 20px;
  --radius-sm: 14px;
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(154, 77, 38, 0.08), transparent 30%),
    radial-gradient(circle at right 15%, rgba(33, 59, 99, 0.08), transparent 32%),
    linear-gradient(180deg, #fbf7ef 0%, #f5efe4 100%);
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  min-height: 100vh;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image:
    linear-gradient(to right, rgba(28, 42, 61, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(28, 42, 61, 0.05) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 92%);
}

a {
  color: inherit;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
}

code, pre {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

.container {
  width: min(1180px, calc(100vw - 32px));
  margin: 0 auto;
}

.skip-link {
  position: absolute;
  left: -999px;
  top: 16px;
  background: var(--paper);
  padding: 8px 12px;
  border-radius: 999px;
  z-index: 1000;
}

.skip-link:focus {
  left: 16px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  background: rgba(251, 248, 242, 0.82);
  border-bottom: 1px solid var(--line);
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: 0.02em;
  font-size: 1.02rem;
}

.brand small {
  color: var(--muted);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, #fff, #f1e8d9);
  color: var(--accent-dark);
  box-shadow: var(--shadow);
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.nav a {
  text-decoration: none;
  color: var(--muted);
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.92rem;
}

.nav a.active,
.nav a:hover {
  color: var(--ink);
  border-color: var(--line);
  background: rgba(255, 255, 255, 0.65);
}

.page {
  padding: 30px 0 72px;
}

.hero,
.session-hero,
.split,
.page-heading,
.section {
  margin-bottom: 24px;
}

.hero,
.session-hero,
.split {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.85fr);
  gap: 22px;
}

.hero-copy h1,
.page-heading h1,
.session-meta h1 {
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: -0.02em;
  line-height: 1.02;
  margin: 0;
}

.hero-copy h1 {
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  max-width: 12ch;
}

.page-heading h1,
.session-meta h1 {
  font-size: clamp(2.1rem, 5vw, 3.8rem);
  max-width: 14ch;
}

.lede {
  font-size: 1.08rem;
  color: var(--muted);
  max-width: 68ch;
}

.eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 700;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--line);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.72);
}

.button.primary {
  background: linear-gradient(180deg, var(--accent-dark), #152844);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.12);
}

.panel,
.card,
.quiz-item,
.table-wrap,
table {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(251, 248, 242, 0.8);
  box-shadow: var(--shadow);
}

.panel,
.quiz-item {
  padding: 22px;
}

.hero-panel {
  display: grid;
  gap: 16px;
}

.compass {
  display: grid;
  gap: 16px;
  align-items: center;
  justify-items: start;
}

.compass-ring {
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(33, 59, 99, 0.12), rgba(154, 77, 38, 0.08));
  color: var(--accent-dark);
  font-size: 1.4rem;
}

.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.section-head h2,
.panel h2,
.quiz-item h3,
.session-side h2,
.session-side h3 {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.1;
  margin: 0 0 10px;
}

.section-head h2 {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

.card-grid {
  display: grid;
  gap: 16px;
}

.card-grid.four {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.card {
  display: grid;
  gap: 8px;
  padding: 18px;
  text-decoration: none;
}

.card strong {
  font-size: 1.04rem;
}

.card span,
.muted,
.panel p,
.quiz-item p,
.table-wrap td,
.table-wrap th,
.ordered li,
.bullets li {
  color: var(--muted);
}

.table-wrap {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

th {
  color: var(--ink);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(33, 59, 99, 0.04);
}

tbody tr:last-child td {
  border-bottom: 0;
}

.bullets,
.ordered {
  margin: 0;
  padding-left: 18px;
}

.bullets li + li,
.ordered li + li {
  margin-top: 8px;
}

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.quiz-item h3 {
  font-size: 1.15rem;
}

.quiz-options {
  margin: 14px 0;
  padding-left: 18px;
}

.quiz-options li + li {
  margin-top: 6px;
}

.quiz-item details {
  margin-top: 12px;
  border-top: 1px dashed var(--line);
  padding-top: 12px;
}

.quiz-item summary {
  cursor: pointer;
  font-weight: 600;
}

.code-block {
  margin: 14px 0 0;
  padding: 18px;
  border-radius: 16px;
  overflow: auto;
  background: #162236;
  color: #f3efe5;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.code-block-long {
  white-space: pre-wrap;
}

.session-hero {
  align-items: start;
}

.session-meta,
.session-side {
  display: grid;
  gap: 16px;
}

.session-number,
.phase-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.7);
  color: var(--accent-dark);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.session-meta .actions {
  margin-top: 18px;
}

.page-heading {
  padding-top: 18px;
}

.ordered code,
.bullets code {
  font-size: 0.95em;
}

@media (max-width: 1024px) {
  .card-grid.four {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero,
  .session-hero,
  .split {
    grid-template-columns: 1fr;
  }

  .quiz-grid {
    grid-template-columns: 1fr;
  }

  .section-head {
    flex-direction: column;
    align-items: start;
  }

  .topbar-inner {
    flex-direction: column;
    align-items: start;
  }

  .nav {
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .container {
    width: min(100vw - 20px, 1000px);
  }

  .page {
    padding-top: 18px;
  }

  .card-grid.four {
    grid-template-columns: 1fr;
  }

  .hero-copy h1 {
    font-size: clamp(2.4rem, 12vw, 4rem);
  }

  .page-heading h1,
  .session-meta h1 {
    font-size: clamp(2rem, 10vw, 3rem);
  }
}
`;
}

function rootReadme() {
  return `# PostgreSQL Learning Track

This repository is a documentation-first learning environment for PostgreSQL.

What lives here:
- a 40-session country-themed PostgreSQL curriculum
- static HTML documentation pages
- prompt and review archives
- future schema, seed, query, and test files

What this repo is not:
- a feature sprint
- an ORM demo
- a dashboard project
- a place to skip the learning sequence

How to start:
1. Open \`docs/index.html\`
2. Read \`docs/syllabus/index.html\`
3. Open \`docs/sessions/session-01/index.html\`

Rules:
- Docs are the source of truth.
- Every session is one small concept.
- Every lesson has a quiz, a lab, and a commit checkpoint.
- New prompts must be added to the prompt archive.
`;
}

function dbReadme() {
  return `# Database Workspace

This folder holds the PostgreSQL learning materials that will appear as the course advances.

Current rule:
- docs explain the work first
- SQL, schema, seed, and test files come later as each lesson unlocks them

Planned subfolders:
- \`schema/\` for table design notes and future schema files
- \`seed/\` for repeatable sample data
- \`queries/\` for lesson SQL examples
- \`migrations/\` for versioned schema changes
- \`mock/\` for CSV and fake data
- \`tests/\` for database behavior checks

The folders exist to make the repo shape obvious, not to rush implementation.
`;
}

function dbSubfolderReadme(title, purpose) {
  return `# ${title}

${purpose}
`;
}

function agentsMd() {
  return `# AGENTS.md

Future AI sessions must read these files before making changes:

1. \`AGENTS.md\`
2. \`README.md\`
3. \`docs/index.html\`
4. The latest session note
5. The latest commit review
6. \`docs/prompts/index.html\`
7. The most relevant lesson page

Working rules:
- Summarize what you read before touching files.
- Update documentation before code, SQL, or schema changes.
- Keep each session tiny enough to understand in one sitting.
- One session should normally map to one commit.
- If a major prompt changes the project direction, add it to the prompt archive first.
`;
}

function rootDocIndexFile() {
  return docHome();
}

function createSite() {
  write("README.md", rootReadme());
  write("AGENTS.md", agentsMd());
  write("index.html", rootIndex());
  write("db/README.md", dbReadme());
  write("db/schema/README.md", dbSubfolderReadme("Schema", "This folder will hold schema design notes and future SQL files for table creation and constraints."));
  write("db/seed/README.md", dbSubfolderReadme("Seed", "This folder will hold repeatable sample data and seed scripts when the curriculum reaches seeding."));
  write("db/queries/README.md", dbSubfolderReadme("Queries", "This folder will hold beginner-readable SQL examples used in the lessons and query notes."));
  write("db/migrations/README.md", dbSubfolderReadme("Migrations", "This folder will hold versioned schema change files once migration workflow becomes part of the course."));
  write("db/mock/README.md", dbSubfolderReadme("Mock Data", "This folder will hold CSV files and other fake datasets used for local learning and testing."));
  write("db/tests/README.md", dbSubfolderReadme("Tests", "This folder will hold database behavior checks, constraint checks, and query result checks."));
  write("docs/styles.css", stylesCss());
  write("docs/index.html", rootDocIndexFile());
  write("docs/syllabus/index.html", syllabusPage());
  write("docs/sessions/index.html", sessionsPage());
  write("docs/lessons/index.html", lessonsPage());
  write("docs/labs/index.html", labsPage());
  write("docs/quizzes/index.html", quizzesPage());
  write("docs/references/index.html", referencesPage());
  write("docs/schema-notes/index.html", schemaNotesPage());
  write("docs/query-notes/index.html", queryNotesPage());
  write("docs/architecture/index.html", architecturePage());
  write("docs/session-notes/index.html", sessionNotesPage());
  write("docs/session-notes/2026-06-30-initialization.html", initializationSessionNotePage());
  write("docs/commit-reviews/index.html", commitReviewsPage());
  write("docs/commit-reviews/2026-06-30-initialization.html", initializationCommitReviewPage());
  write("docs/prompts/index.html", promptsPage());
  write("docs/prompts/2026-06-30-project-initialization.html", promptDetailPage());

  for (const session of sessions) {
    const rel = `docs/sessions/session-${pad(session.n)}/index.html`;
    write(rel, sessionPage(session));
  }
}

createSite();
