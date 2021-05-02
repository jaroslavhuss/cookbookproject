# Teamový Projekt - vývojový list

## Ahoj všem,

1. buď si můžete stáhnout obsah pomocí `git clone https://github.com/jaroslavhuss/cookbookproject.git`
2. Nebo si stáhnete složku v zipu... 

## měli byste v kořenovém adresáři vidět 3 složky:
1. Server2 - zde je backend, express
2. client - zde je react 
3. Creatives - ze jsou PS files

V kořenovém adresáři stačí hodit 
`npm run instalace`
Tento kód nainstaluje do obou složek (server2 a client) jejich dependencies. 

Pak je potřeba udělat poslední věc. 

1. `cd server2` // Přejdete do šložky server2
2. `touch .env` // Vytvoří soubor .env, který není z ochrany dat pushnutý na server
3. Obsah pro .env vám dám osobně, aby nám nikdo neojebal DB. Bez .env backend nebude fungovat

Mám otestované, že to pak funguje out of the box. 

## Jak nastartovat appku?

1. Pak už je jedno, jestli hodíte `npm run dev` v kořenové složce nebo ve složce server2

Jarda