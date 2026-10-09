GRAW STORE — OWNER PRODUCT MANAGEMENT

CUSTOMER PAGES
--------------
Customers only see the storefront:
- index.html
- men.html
- women.html
- product.html

They do NOT see Add Product or Remove Product controls.

OWNER PAGE
----------
owner.html is a separate management page.
Use it to:
- Add products
- Remove products
- Set price, category, specifications and image URL

PRODUCT DATA
------------
Products are stored in the browser's localStorage under:
grawStoreProducts

IMPORTANT SECURITY NOTE
-----------------------
This is a front-end-only website. Hiding owner.html and its controls from
customers is a UI separation, NOT real security. Anyone who knows the URL
and has browser access can potentially open owner.html or modify localStorage.

For a real online store, owner authentication and product storage should be
handled by a server/database (for example Firebase, Supabase, or a custom backend).

HTML = structure
CSS = design
JavaScript = store functionality and owner management


OWNER DASHBOARD
---------------
The owner.html page now uses a professional admin dashboard layout with statistics, product search/filtering, inventory management, and a structured product creation form.
