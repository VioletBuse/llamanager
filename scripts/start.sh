#!/usr/bin/env bash

if ["$FLY_PROCESS_GROUP" = "worker"]; then
    litestream_exec.sh
elif ["$FLY_PROCESS_GROUP" = "manager"] || ["$FLY_PROCESS_GROUP" = "api"]; then
    litefs mount
else
    echo "Error: Unknown process group: ${FLY_PROCESS_GROUP}" >&2
    exit 1
fi
