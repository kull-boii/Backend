The api has many endpoints

### Functionalities

- sort on various fields (sort=name,price)
- sort on numeric fields (numericFilters=price>40,rating>=4.5)
- pagination(page=2)
- name field contains the given substring (name=oo)
- match exactly (eatured=false&company=ikea)

### Examples

- /api/v1/products?name=armchair
- /api/v1/products?featured=false&company=ikea&name=chair
- /api/v1/products?name=chair&sort=name,price
- /api/v1/products?company=ikea&fields=name,price,rating
- /api/v1/products?page=2
- /api/v1/products?numericFilters=price>40,rating>=4.5
- /api/v1/products?name=chair&sort=name,price&fields=name,price,rating&numericFilters=price>40,rating>=4.5