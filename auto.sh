#!/bin/sh
currentpath=$(dirname $0)
cd $currentpath
buildFun(){
    if test -e ./node_modules
    then
        npm run build
    else
        yarn
        npm run build
    fi
}
buildFun
echo "\"创建完成，请使用当前目录下build文件部署下载页\""
