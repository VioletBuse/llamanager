#!/usr/bin/env sh

if [-f "/litefs/.primary"]; then
    litestream replicate -exec litestream_exec.sh
else 
    litestream_exec.sh
fi
