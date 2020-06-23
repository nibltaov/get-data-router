const { readdirSync, statSync } = require('fs'),
    { extname, resolve, parse } = require('path')
    getDateFile = (importPath, collBack = false, exportObj) => {
        try {
            const obj = exportObj ? exportObj : {},
                _file = readdirSync(importPath)
            for (const value of _file) {
                const newPath = `${importPath}/${value}`, stat = statSync(newPath)
                if (stat.isFile() && extname(value) === '.js') obj[newPath] = require(resolve(newPath))
                else if (stat.isDirectory()) getDateFile(newPath, false, obj)
            }
            if (typeof collBack === 'function') {
                for (const key in obj) {   
                    const parseDir = parse(key).dir
                    let cleanUpendPath = key === `${parseDir}/index.js`
                        ? key.slice(importPath.length, key.length - 'index.js'.length)
                        : key.slice(importPath.length, key.length - '.js'.length)
                        cleanUpendPath = cleanUpendPath.length > 1 && cleanUpendPath[cleanUpendPath.length - 1] === '/'
                                        ? cleanUpendPath.substring(0, cleanUpendPath.length - 1)
                                        : cleanUpendPath                       
                    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                        for (const res in obj[key]) {
                            const fn = obj[key][res]
                            if (typeof fn === 'function') collBack(cleanUpendPath, res, fn)
                            else if (typeof fn === 'object' && !Array.isArray(obj[key])) {
                                const middleware = fn['mw'] ?? undefined,
                                    params = fn['params'] ? '/' + fn['params'] : ''
                                collBack(cleanUpendPath + params, res, fn['fn'], middleware)
                            }
                        }
                    }
                }
            } else if (!collBack) return obj
        } catch {
            console.error(`There is no such route. Check the correct path`)
        }
    }

module.exports = getDateFile