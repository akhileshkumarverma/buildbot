# buildbot/buildbot-master

# please follow docker best practices
# https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/
#
# Provides a base alpine image with latest buildbot master installed
# Alpine base build is ~130MB vs ~500MB for the ubuntu build

# Note that the UI and worker packages are the latest version published on pypi
# This is to avoid pulling node inside this container

FROM        alpine:3.7
MAINTAINER  Buildbot maintainers

# Last build date - this can be updated whenever there are security updates so
# that everything is rebuilt
ENV         security_updates_as_of 2018-04-11


COPY . /usr/src/buildbot

# Build wheels in other container using the Dockerfile.build
# and copy them into this container.
# We do this to avoid having to pull gcc for building native extensions.
COPY --from=buildbot-build /wheels /wheels
RUN \
    echo @edgecommunity http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @testing http://nl.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories && \
    apk add --no-cache \
        git \
        python \
        py-pip \
        gosu@testing \
        dumb-init \
        tar \
        tzdata \
        curl && \
# install pip dependencies
    pip install --upgrade pip setuptools && \
    pip install /wheels/*.whl && \
    pip install "buildbot[bundle,tls]" && \
    pip install "/usr/src/buildbot" && \
    rm -r /root/.cache /wheels


WORKDIR /var/lib/buildbot
CMD ["dumb-init", "/usr/src/buildbot/docker/start_buildbot.sh"]
