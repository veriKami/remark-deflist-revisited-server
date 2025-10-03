# Remark Deflist Revisited °// Server Example

<!--
[![GH][GH Badge]][GH]
[![NPM][NPM Badge]][NPM]
[![JSR][JSR Badge]][JSR]
[![Downloads][Downloads Badge]][Downloads]
[![Socket][Socket Badge]][Socket]
-->

Server example of using **`@verikami/remark-deflist-revisited`** in Node.js.

**[Remark Deflist Revisited][module]** is a **[Remark]** plugin. A wrapper
around **`remark-deflist`** with improved support for nested definition lists.
It preserves all the original functionality and performs additional processing.
See also examples of **[Express.js]**, **[Astro]** and **[Cloudflare Worker]** implementations.

## Interactive Start

[![Codeflow][Codeflow Badge]][Codeflow]
[![StackBlitz][StackBlitz Badge]][StackBlitz]
[![Codesandbox][Codesandbox Badge]][Codesandbox]

<!--
[![Codespaces][Codespaces Badge]][Codespaces]
-->

## Features

- Pure Node.js with minimal dependencies
- Interactive web server with live markdown editor
- Modular architecture with reusable functions
- File output capability
- External CSS styling
- Comprehensive test suite with node:test
- Error handling and input validation
- Multiple usage examples

## Requirements

- Node.js 20 or higher
- npm, pnpm or yarn

## Quick Start

```bash
# Install dependencies
npm install

# Start interactive web server (opens at http://localhost:3000)
npm start

# Start server with auto-reload on file changes
npm run dev

# Run comprehensive test suite
npm test
```

## Usage Examples

### Interactive Web Server

Start the server and open your browser:

```bash
npm start

# Visit http://localhost:3000
```

**Available routes:**

- `GET /` - Interactive markdown editor with live preview
- `POST /process` - Process markdown from form submission
- `GET /generate` - Generate static output.html file

**The web interface provides:**

- Live markdown editor with syntax support
- Real-time HTML preview
- Pre-filled examples
- Form submission for processing

### As a Module

```javascript
import { processMarkdown } from './lib/processor.js';
import { createHTMLPage } from './lib/template.js';
import { generateFromFile, generateFromString } from './lib/generator.js';

// Process markdown string
const markdown = `
Term
: Definition 1
: Definition 2
`;

const html = await processMarkdown(markdown);
const page = createHTMLPage(html, 'My Page Title');

// Generate from file
await generateFromFile('input.md', 'output.html', 'Document Title');

// Generate from string
const result = await generateFromString(markdown, 'Page Title');
```

## Project Structure

```
project/
├── server.js             # Main entry point - web server
├── test.js               # Comprehensive test suite
├── lib/
│   ├── processor.js      # Markdown processing logic
│   ├── template.js       # HTML template generation
│   └── generator.js      # File generation utilities
├── styles/
│   └── main.css          # Stylesheet for output
└── examples/
    ├── basic.md          # Basic definition list example
    └── api.md            # API documentation example
```

### Key Files

- **`server.js`** - Main HTTP server with interactive editor and routing
- **`lib/processor.js`** - Core markdown to HTML conversion using remark
- **`lib/template.js`** - HTML page generation with CSS integration
- **`lib/generator.js`** - Static file generation utilities
- **`test.js`** - Test suite using Node.js native test runner
- **`examples/*.md`** - Sample markdown files with definition lists

## Output

### Web Server Mode (`npm start`)

Starts an HTTP server on port 3000 with:

- Interactive markdown editor form
- Real-time HTML preview
- Definition lists rendering
- Responsive design with professional styling

### Static Generation (`GET /generate`)

Visit `http://localhost:3000/generate` to create `output.html` with:

- Processed markdown from `examples/basic.md`
- Fully styled HTML page
- Definition lists support
- Embedded CSS for portability

## Testing

The project includes a comprehensive test suite using Node.js native test runner:

```bash
npm test
```

**Test Coverage:**

- Markdown processing (basic and nested definition lists)
- HTML template generation
- File loading from examples
- Edge cases handling

**Example output:**

```
# tests 9
# pass 9
# fail 0
```

## Definition List Syntax

This plugin supports the standard definition list markdown syntax:

```markdown
Term
: Definition 1
: Definition 2

Another Term
: With nested content
: - Bullet point 1
  - Bullet point 2
```

**Renders as:**

```html
<dl>
  <dt>Term</dt>
  <dd>Definition 1</dd>
  <dd>Definition 2</dd>
</dl>
```

## License

This project is Open Source and available under the MIT License  
2025 © MIT °// [veriKami] °// [Weronika Kami]

[veriKami]: https://verikami.com
[Weronika Kami]: https://linkedin.com/in/verikami

[module]: https://github.com/veriKami/remark-deflist-revisited
[Simple]: https://github.com/veriKami/remark-deflist-revisited-simple
[Express.js]: https://github.com/veriKami/remark-deflist-revisited-express
[Astro]: https://github.com/veriKami/remark-deflist-revisited-astro
[Cloudflare Worker]: https://github.com/veriKami/remark-deflist-revisited-worker

[GH Badge]: https://img.shields.io/badge/GitHub-Repository-blue?logo=github
[GH]: https://github.com/veriKami/remark-deflist-revisited

[NPM Badge]: https://img.shields.io/npm/v/@verikami/remark-deflist-revisited?logo=npm&logoColor=white&labelColor=red&color=black
[NPM]: https://www.npmjs.com/package/@verikami/remark-deflist-revisited

[JSR Badge]: https://jsr.io/badges/@verikami/remark-deflist-revisited
[JSR]: https://jsr.io/@verikami/remark-deflist-revisited

[Downloads Badge]: https://img.shields.io/npm/dm/@verikami/remark-deflist-revisited.svg
[Downloads]: https://www.npmjs.com/package/@verikami/remark-deflist-revisited

[Socket Badge]: https://badge.socket.dev/npm/package/@verikami/remark-deflist-revisited
[Socket]: https://socket.dev/npm/package/@verikami/remark-deflist-revisited

[Remark]: https://remark.js.org

[Codeflow Badge]: https://developer.stackblitz.com/img/open_in_codeflow.svg
[Codeflow]: https:///pr.new/veriKami/remark-deflist-revisited-server

[StackBlitz Badge]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[StackBlitz]: https://stackblitz.com/github/veriKami/remark-deflist-revisited-server

[Codesandbox Badge]: https://codesandbox.io/static/img/play-codesandbox.svg
[Codesandbox]: https://codesandbox.io/p/github/veriKami/remark-deflist-revisited-server

[Codespaces Badge]: https://github.com/codespaces/badge.svg
[Codespaces]: https://codespaces.new/veriKami/remark-deflist-revisited-server?quickstart=1

