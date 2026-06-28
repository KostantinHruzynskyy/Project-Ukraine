(() => {
  const terminalSection = document.getElementById('admin-console');
  if (!terminalSection) return;

  const output = terminalSection.querySelector('.console-output');
  const input = terminalSection.querySelector('#admin_console_input');
  const runButton = terminalSection.querySelector('#admin_console_run');
  const links = Array.from(document.querySelectorAll('.access-link')).map((anchor, index) => ({
    index: index + 1,
    name: anchor.querySelector('span')?.textContent?.trim() || anchor.getAttribute('href'),
    href: anchor.getAttribute('href'),
    file: anchor.querySelector('small')?.textContent?.trim() || anchor.getAttribute('href'),
  }));

  function appendLine(text, kind = 'info') {
    const line = document.createElement('div');
    line.className = `console-line console-${kind}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function renderHelp() {
    appendLine('Comandi disponibili: help, list pages, list data, list api, list links, open <n|path>, show checks, edit <path>, clear', 'help');
    appendLine('Esempi: list pages, open pages/Main.html, edit data/pages/27-admin.json', 'help');
  }

  function clearOutput() {
    output.innerHTML = '';
  }

  function formatList(items) {
    items.forEach((item) => {
      appendLine(item);
    });
  }

  async function fetchJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Errore su ${path}`);
    return response.json();
  }

  async function fetchText(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Errore su ${path}`);
    return response.text();
  }

  async function handleCommand(raw) {
    const commandText = raw.trim();
    if (!commandText) return;
    appendLine(`> ${commandText}`, 'prompt');
    const [command, ...args] = commandText.split(/\s+/);
    const argString = args.join(' ').trim();

    try {
      switch (command.toLowerCase()) {
        case 'help':
        case '?':
          renderHelp();
          break;
        case 'clear':
          clearOutput();
          break;
        case 'list': {
          if (!argString) {
            appendLine('Uso: list pages|data|api|links', 'error');
            break;
          }
          switch (argString.toLowerCase()) {
            case 'pages':
              formatList(links.filter((link) => link.href.startsWith('pages/')).map((link) => `${link.index}. ${link.file} → ${link.href}`));
              break;
            case 'data':
              formatList(links.filter((link) => link.href.startsWith('data/')).map((link) => `${link.index}. ${link.file} → ${link.href}`));
              break;
            case 'api':
              formatList(links.filter((link) => link.href.startsWith('api/')).map((link) => `${link.index}. ${link.file} → ${link.href}`));
              break;
            case 'links':
              formatList(links.map((link) => `${link.index}. ${link.file} → ${link.href}`));
              break;
            default:
              appendLine('Filtro non riconosciuto. Usa pages, data, api o links.', 'error');
              break;
          }
          break;
        }
        case 'open': {
          if (!argString) {
            appendLine('Uso: open <numero|percorso>', 'error');
            break;
          }
          const index = Number(argString);
          const link = Number.isInteger(index) ? links.find((item) => item.index === index) : links.find((item) => item.href === argString || item.file === argString);
          if (!link) {
            appendLine(`Link non trovato: ${argString}`, 'error');
            break;
          }
          window.open(link.href, '_blank');
          appendLine(`Aperto: ${link.href}`, 'success');
          break;
        }
        case 'show': {
          if (argString.toLowerCase() !== 'checks') {
            appendLine('Uso: show checks', 'error');
            break;
          }
          const data = await fetchJson('data/admin-checks.json').catch(async () => fetchJson('api/admin.php').then((json) => json.checks));
          if (!Array.isArray(data)) {
            appendLine('Nessun dato controlli trovato.', 'error');
            break;
          }
          data.forEach((item) => appendLine(`${item[0]}: ${item[1]} — ${item[2]}`));
          break;
        }
        case 'edit': {
          if (!argString) {
            appendLine('Uso: edit <percorso>', 'error');
            break;
          }
          const path = argString;
          const content = await fetchText(path).catch((err) => {
            appendLine(err.message, 'error');
            return null;
          });
          if (!content) break;
          clearOutput();
          const editor = document.createElement('textarea');
          editor.className = 'console-editor';
          editor.value = content;
          output.appendChild(editor);
          const saveNote = document.createElement('div');
          saveNote.className = 'console-note';
          saveNote.textContent = 'Modifica qui, poi copia il testo nel tuo editor. Il salvataggio diretto non è supportato da questo terminale statico.';
          output.appendChild(saveNote);
          appendLine(`File caricato: ${path}`, 'success');
          break;
        }
        default:
          appendLine(`Comando non riconosciuto: ${commandText}`, 'error');
          renderHelp();
          break;
      }
    } catch (error) {
      appendLine(error instanceof Error ? error.message : String(error), 'error');
    }
  }

  function handleRun() {
    const text = input.value;
    handleCommand(text);
    input.value = '';
    input.focus();
  }

  runButton.addEventListener('click', handleRun);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleRun();
    }
  });

  renderHelp();
})();
