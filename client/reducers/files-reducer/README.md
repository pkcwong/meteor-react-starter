## Files Saga

state | type | initialize | description
--- | --- | --- | ---
```uploaded``` | Array | ```[]``` | uploaded files id

dispatch type | payload | description
--- | --- | ---
```Files/UPLOAD-COMPLETE``` | <ul><li>file : FileCursor object</li></ul> | updates ```uploaded``` prop
```Files/UPLOAD-RESET``` | ```null``` | empties the ```uploaded``` array prop
