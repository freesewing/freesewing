---
title: De FreeSewing API voor de achterkant openen
caption: Een messing versierde Vintage toets op zwart computertoetsenbord, door PixaBay
date: 20231103
intro: De FreeSewing backend API ondersteunt nu API keys zodat je er ook mee kunt communiceren
author: 1
---

Mensen uitsluiten van je API lijkt tegenwoordig in de mode te zijn. Met plaatsen als Twitter -- nee, X -- en Reddit die API-toegang blokkeren of ervoor laten betalen.

Ik heb precies het tegenovergestelde gedaan en als onderdeel van de uitrol van de nieuwe FreeSewing.org heb ik een nieuwe backend gebouwd die door iedereen gebruikt kan worden.

De backend ondersteunt authenticatie via API-sleutels en je kunt die sleutels hier in je accountinstellingen genereren. Je kunt er zoveel aanmaken als je wilt, de vervaldatum erop instellen en het toegangsniveau configureren.

## Waarom?

Goede vraag. Ten eerste denk ik dat het aardig is om te doen. Maar belangrijker vind ik dat als je al die metingen in FreeSewing gaat zetten, je ze misschien beter ergens anders kunt gebruiken, niet? Dus dat wilde ik vergemakkelijken.

Ik verwacht dat dit, in eerste instantie althans, een nichefunctie zal zijn. Ik heb echter goede hoop dat andere mensen die werken op het gebied van parametrisch ontwerpen en op maat gemaakte naaipatronen (of zelfs gewoon mensen die op zoek zijn naar metingen) dit zullen waarderen en dit hopelijk zullen integreren in hun eigen scripts of tooling.

Als er niets anders is, weet ik dat ik dat zal doen.

De [REST API reference documentation lives here] (https\://freesewing.dev/reference/backend), als je op zoek bent naar de OpenAPI Specification, ga dan naar https\://backend3.freesewing.org/docs/.

## Gebruiken, niet misbruiken

Onze backend API draait in een cloudomgeving en hoewel ik geen kosten in rekening breng voor toegang tot de API, moet ik wel de rekeningen betalen van die cloudprovider.

Houd daarom rekening met het aantal verzoeken dat je genereert. En als je grote plannen hebt, neem dan eerst contact met me op om ze te bespreken.

Ik zal het gebruik van onze backend API in de gaten houden en we kunnen op elk moment besluiten om API-sleutels in te trekken als ik vind dat het gebruik verder gaat dan wat ik kan of wil ondersteunen.
Backend gebruik zal worden gecontroleerd en ik kan ingrijpen
