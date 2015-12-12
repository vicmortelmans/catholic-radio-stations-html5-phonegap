#!/bin/sh
gsutil rsync -x '\.git.*' -R . gs://radio.gelovenleren.net
