
## MJML App website

### Installation

``` bash

npm install

```

### Update Download links

``` bash

vim +10 src/components/Hero.js
fhci'<paste the new url>

```

### Test the website

#### Hot reload

``` bash

npm start

```

#### Static

``` bash

npm run build &&
open dist/index.html

```

### Deploy

``` bash

npm run lint &&
npm run build &&
npm run deploy

```
