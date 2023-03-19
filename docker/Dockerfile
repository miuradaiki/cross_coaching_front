# 2022年9月時点の最新版のNode
FROM node:18.10.0

# Set up work directory
WORKDIR /var/www

# Configure host
ENV HOST 0.0.0.0

# Expose port
# EXPOSE 3000

# Init command
CMD ["sh", "-c", "yarn install && yarn dev"]
