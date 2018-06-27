## FilesComponentContainerTracker

prop | type | description
--- | --- | ---
files | Array | array of file ids
onMount | Function | function to receive component methods
onRemove | Function | function to be called when user removes a file
onUpload | Function | function to be called when user uploads a file

method | description
--- | ---
show() | displays the file picker
hide() | hides the file picker

### Usage

```JavaScript
    import React from 'react';
    import { FilesComponentContainerTracker } from "../../components/files-component/tracker";
    
    export class IndexPage extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {
                files: []
            };
            this.elements = {};
        }
    
        render() {
            return (
                <FilesComponentContainerTracker
                    files={this.state.files}
                    onMount={(c) => {
                        this.elements.files = c;
                    }}
                    onRemove={(file) => {
                        let array = this.state.files;
                        let index = array.indexOf(file);
                        if (index !== -1) {
                            array.splice(index, 1);
                            this.setState({
                                files: array
                            });
                        }
                    }}
                    onUpload={(file) => {
                        let files = this.state.files;
                        files.push(file);
                        this.setState({
                            files: files
                        });
                    }}
                />
            );
        }
    
        componentDidMount() {
            this.elements.files.show();
        }
    
    }
```
