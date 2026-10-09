import os
import re

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.svelte'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()

            # Fix double $props()
            content = re.sub(r'let \{ data \} = \$props\(\);\s*let \{ form \} = \$props\(\);', 'let { data, form } = $props();', content)

            # Fix $: a = b to let a = $derived(b)
            # This is tricky with multiline but let's do a simple replace for specific cases
            # $: filteredProducts = data.products.filter(p => { ... });
            
            # Use sed or regex to fix specific files if python regex is too complex
            with open(path, 'w') as f:
                f.write(content)
