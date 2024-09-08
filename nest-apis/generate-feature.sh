#!/bin/bash

# Check if the feature name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <feature-name>"
  exit 1
fi

FEATURE_NAME=$1

nest g module $FEATURE_NAME --no-spec
nest g service $FEATURE_NAME --no-spec
nest g controller $FEATURE_NAME --no-spec