#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available
#
#   Source: https://github.com/vishnubob/wait-for-it

TIMEOUT=90
QUIET=0
HOST="$1"
PORT="$2"

echo "Waiting for $HOST:$PORT..."

for i in `seq $TIMEOUT` ; do
    nc -z "$HOST" "$PORT" > /dev/null 2>&1
    result=$?
    if [ $result -eq 0 ] ; then
        exit 0
    fi
    sleep 1
done

echo "Operation timed out" >&2
exit 1