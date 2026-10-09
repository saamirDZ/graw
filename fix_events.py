import os
import re

def fix_events_in_file(path):
    with open(path, 'r') as f:
        content = f.read()

    # Fix modifiers first
    # on:click|preventDefault={closeBag}
    def replace_prevent_default(m):
        func = m.group(1)
        if func.startswith('() =>'):
            # e.g. () => activeTab = 'dashboard'
            body = func[5:].strip()
            if body.startswith('{'):
                return f'onclick={{(e) => {{ e.preventDefault(); {body[1:]}}}'
            else:
                return f'onclick={{(e) => {{ e.preventDefault(); {body}; }}}}'
        elif func.startswith('(e) =>'):
            body = func[6:].strip()
            return f'onclick={{(e) => {{ e.preventDefault(); {body}; }}}}'
        else:
            return f'onclick={{(e) => {{ e.preventDefault(); {func}(e); }}}}'

    content = re.sub(r'on:click\|preventDefault=\{([^}]+)\}', replace_prevent_default, content)
    content = re.sub(r'on:submit\|preventDefault=\{([^}]+)\}', lambda m: f'onsubmit={{(e) => {{ e.preventDefault(); {m.group(1)}(e); }}}}', content)

    # General replacements
    content = content.replace('on:click={', 'onclick={')
    content = content.replace('on:keydown={', 'onkeydown={')
    content = content.replace('on:submit={', 'onsubmit={')

    with open(path, 'w') as f:
        f.write(content)

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.svelte'):
            fix_events_in_file(os.path.join(root, file))
