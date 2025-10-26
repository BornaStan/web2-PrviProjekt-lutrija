Aplikacija Lutrija za prvu laboratorijsku vježbu iz WEB-2

Adresa web-aplikacije: https://lutrija-app.onrender.com/

Adresa javno dostupnog git repozitorija: https://github.com/BornaStan/web2-PrviProjekt-lutrija.git

Pristupne točke:
https://lutrija-app.onrender.com/new-round
https://lutrija-app.onrender.com/close
https://lutrija-app.onrender.com/store-results

Pristupnim točkama se pristupa preko POST zahtjeva korištenjem OAuth2 Client Credentials (machine-to-machine).

Za to je potreban access token. On se dobivam pozivom POST metode nad https://dev-...../oauth/token
U Headers je potrebno staviti Content-Type: application/json te u body JSON s podacima, u našem slučaju:
{
  "client_id": "xxxxxx",
  "client_secret": "xxxxxxx",
  "audience": "xxxxxxxx",
  "grant_type": "client_credentials"
}

Dobiveni odgovor će sadržavati access_token.

Za kreiranje novog kola potrebno je pozvati metodu POST https://lutrija.onrender.com/new-round, te u Headers obavezno staviti
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs... -> ranije dobiven access token

Isto tako se s /close zatvara kolo.
POST https://lutrija.onrender.com/close
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs... -> ranije dobiven access token

Izvučeni brojevi za zatvoreno kolo se spremaju pomoću:
POST https://lutrija.onrender.com/store-results
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs... -> ranije dobiven access token
Body:
    {
  "numbers": [2, 8, 14, 22, 34, 41]
}







