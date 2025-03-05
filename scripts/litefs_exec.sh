#!/usr/bin/env bash

if [-f "/litefs/.primary"]; then
    litestream replicate -exec litestream_exec.sh
else 
    litestream_exec.sh
fi
