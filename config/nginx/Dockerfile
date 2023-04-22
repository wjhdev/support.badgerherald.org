FROM nginx:latest

# Install certbot
RUN apt-get update && \
    apt-get install -y certbot && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/bin/

COPY support.badgerherald.org.conf /etc/nginx/nginx.conf

# Copy the entrypoint script to the container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run the entrypoint script
CMD /entrypoint.sh $DOMAIN