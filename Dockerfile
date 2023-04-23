FROM ghcr.io/broadsheet-technology/webpress-compile:0.1 as compiled-theme
WORKDIR /app
COPY . .

RUN /app/compile.sh

FROM ghcr.io/broadsheet-technology/wordpress:0.4

LABEL maintainer="Will Haynes <will@broadsheet.technology>"
LABEL version="1.0"
LABEL description="Support the Herald!"

COPY --from=compiled-theme /app/dist/wp-content/themes/. /var/www/html/wp-content/themes/.
RUN chown -R www-data:www-data /var/www/html/wp-content/themes
RUN chmod -R 755 /var/www/html/wp-content/themes

COPY --from=compiled-theme /app/dist/stencil-stats.json /srv/stencil-stats.json
RUN chown -R www-data:www-data /srv/stencil-stats.json
RUN chmod -R 755 /srv/stencil-stats.json