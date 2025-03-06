#!/usr/bin/env bash

if [! -f "/litefs/.primary"]; then
    litestream replicate -exec /app/scripts/litestream_exec.sh
else 
    /app/scripts/litestream_exec.sh
fi
