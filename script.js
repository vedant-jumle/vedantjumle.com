window.addEventListener('load', function() {
  const input = document.getElementById('command-input');
  const output = document.getElementById('output');
  const terminal = document.getElementById('terminal');
  // Command history support
  let history = [];
  let historyIndex = 0;

  function print(text, html = false) {
    const div = document.createElement('div');
    if (html) div.innerHTML = text;
    else div.textContent = text;
    output.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  print('Welcome to vedant@jumle:~');
  print('Type "help" to list commands. Use "list" to toggle list view.');

  input.addEventListener('keydown', function(e) {
    // Auto-complete on Tab
    if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value;
      const parts = val.split(' ');
      const cmdName = parts[0];
      const commands = ['help','ls','open','clear','feedback','list','theme'];
      if (parts.length === 1) {
        const matches = commands.filter(c => c.startsWith(cmdName));
        if (matches.length === 1) {
          input.value = matches[0] + ' ';
        } else if (matches.length > 1) {
          print(matches.join('  '));
        }
      } else {
        let candidates = [];
        if (cmdName === 'open' || cmdName === 'ls') {
          candidates = content.sections.slice();
          if (cmdName === 'open') {
            content.projects.forEach(p => candidates.push(p.slug));
            content.research.forEach(r => candidates.push(r.slug));
            if (content.blog) content.blog.forEach(b => candidates.push(b.slug));
          }
        }
        const argStart = parts[1];
        const matches = candidates.filter(item => item.startsWith(argStart));
        if (matches.length === 1) {
          input.value = cmdName + ' ' + matches[0];
        } else if (matches.length > 1) {
          print(matches.join('  '));
        }
      }
      return;
    }
    // Command history navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length) {
        if (e.key === 'ArrowUp' && historyIndex > 0) {
          historyIndex--;
        } else if (e.key === 'ArrowDown' && historyIndex < history.length) {
          historyIndex++;
        }
        input.value = historyIndex < history.length ? history[historyIndex] : '';
      }
      return;
    }
    // Execute command on Enter
    if (e.key === 'Enter') {
      const command = input.value.trim();
      print('<span class="prompt">vedant@jumle:~$</span> ' + command, true);
      history.push(command);
      historyIndex = history.length;
      handleCommand(command);
      input.value = '';
    }
  });

  function handleCommand(cmdLine) {
    if (!cmdLine) return;
    const parts = cmdLine.split(' ');
    const cmd = parts[0];
    const arg = parts[1];
    switch (cmd) {
      case 'help':
        print('help - list commands');
        print('ls [section] - list sections or items');
        print('open <name> - open a section or item');
        print('clear - clear the terminal');
        print('feedback - send feedback');
        print('list - toggle list view');
        print('theme - toggle dark/light theme');
        break;
      case 'ls':
        if (!arg) {
          print(content.sections.join('  '));
        } else if (content[arg]) {
          if (Array.isArray(content[arg])) {
            const list = content[arg]
              .map(item => item.slug + ' - ' + item.title)
              .join('\n');
            print(list);
          } else if (typeof content[arg] === 'object') {
            print(Object.keys(content[arg]).join('  '));
          } else {
            print(arg);
          }
        } else {
        print("ls: cannot access '" + arg + "': No such directory");
        }
        break;
      case 'open':
        if (!arg) {
          print('open: missing argument');
        } else if (arg === 'about') {
          print(content.about);
        } else if (arg === 'cv') {
          print('<a href="' + content.cv.link + '" target="_blank">' + content.cv.description + '</a>', true);
        } else if (arg === 'contact') {
          const c = content.contact;
          const html = 'Email: <a href="mailto:' + c.email + '">' + c.email + '</a><br>' +
            'GitHub: <a href="' + c.github + '" target="_blank">' + c.github + '</a><br>' +
            'LinkedIn: <a href="' + c.linkedin + '" target="_blank">' + c.linkedin + '</a>';
          print(html, true);
        } else if (arg === 'blog') {
          // List blog entries
          if (Array.isArray(content.blog)) {
            const list = content.blog.map(item => item.slug + ' - ' + item.title).join('\n');
            print(list);
          }
        } else {
          // Open project
          const proj = content.projects.find(p => p.slug === arg);
          if (proj) {
            const html = '<strong>' + proj.title + '</strong><br>' +
              proj.desc + '<br>' +
              'Stack: ' + proj.stack.join(', ') + '<br>' +
              '<a href="' + proj.repo + '" target="_blank">Repo</a> | ' +
              '<a href="' + proj.demo + '" target="_blank">Demo</a>';
            print(html, true);
            return;
          }
          // Open research paper
          const paper = content.research.find(r => r.slug === arg);
          if (paper) {
            const html = '<strong>' + paper.title + '</strong><br>' +
              paper.desc + '<br>' +
              '<a href="' + paper.link + '" target="_blank">View Paper</a>';
            print(html, true);
            return;
          }
          // Open blog entry
          if (content.blog) {
            const blogEntry = content.blog.find(b => b.slug === arg);
            if (blogEntry) {
              const html = '<strong>' + blogEntry.title + '</strong><br>' +
                '<a href="' + blogEntry.link + '" target="_blank">Read on blog</a>';
              print(html, true);
              return;
            }
          }
          print("open: '" + arg + "' not found");
        }
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      case 'feedback':
        print('<a href="mailto:' + content.contact.email + '?subject=Website Feedback">Send feedback to ' + content.contact.email + '</a>', true);
        break;
      case 'list':
        document.getElementById('list-view').classList.toggle('hidden');
        break;
      case 'theme':
        document.body.classList.toggle('light');
        break;
      default:
        print('Command not found: ' + cmd + '. Did you mean ls, open, or help?');
    }
  }
  // Handle URL hash routing
  function handleHash() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const parts = hash.split('/');
      if (parts.length === 1) {
        handleCommand('open ' + parts[0]);
      } else if (parts.length === 2) {
        handleCommand('open ' + parts[1]);
      }
    }
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();

  // Menu toggle and UI controls
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle.addEventListener('click', () => menu.classList.toggle('hidden'));
  menuToggle.addEventListener('keypress', (e) => { if (e.key === 'Enter') menu.classList.toggle('hidden'); });
  menu.querySelectorAll('a, button').forEach(el => el.addEventListener('click', () => menu.classList.add('hidden')));
  document.getElementById('toggle-list-view').addEventListener('click', () => {
    const lv = document.getElementById('list-view');
    lv.classList.toggle('hidden');
    lv.setAttribute('aria-hidden', lv.classList.contains('hidden'));
  });
  document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('light');
  });

  // Render hybrid content list view
  const listViewEl = document.getElementById('list-view');
  function renderListView() {
    let html = '';
    // About
    html += '<section><h2>About</h2><p>' + content.about + '</p></section>';
    // CV
    html += '<section><h2>CV</h2><p><a href="' + content.cv.link + '" target="_blank">' + content.cv.description + '</a></p></section>';
    // Projects
    html += '<section><h2>Projects</h2><div class="grid">';
    content.projects.forEach(p => {
      html += '<div class="card"><h3>' + p.title + '</h3><p>' + p.desc + '</p><p>Stack: ' + p.stack.join(', ') + '</p><p><a href="' + p.repo + '" target="_blank">Repo</a> | <a href="' + p.demo + '" target="_blank">Demo</a></p></div>';
    });
    html += '</div></section>';
    // Research
    html += '<section><h2>Research</h2>';
    content.research.forEach(r => {
      html += '<div class="card"><h3>' + r.title + '</h3><p>' + r.desc + '</p><p><a href="' + r.link + '" target="_blank">View Paper</a></p></div>';
    });
    html += '</section>';
    // Blog
    if (content.blog) {
      html += '<section><h2>Blog</h2>';
      content.blog.forEach(b => {
        html += '<div class="card"><h3>' + b.title + '</h3><p><a href="' + b.link + '" target="_blank">Read on blog</a></p></div>';
      });
      html += '</section>';
    }
    // Contact
    html += '<section><h2>Contact</h2><p>Email: <a href="mailto:' + content.contact.email + '">' + content.contact.email + '</a></p><p>GitHub: <a href="' + content.contact.github + '" target="_blank">' + content.contact.github + '</a></p><p>LinkedIn: <a href="' + content.contact.linkedin + '" target="_blank">' + content.contact.linkedin + '</a></p></section>';
    listViewEl.innerHTML = html;
  }
  renderListView();
});