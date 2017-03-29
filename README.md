# react-withPromises-HOC
This is a way to invoke promises in a HOC and optionally pass down the resulting values as props

## Usage

its useful to include it after `connect` if you're using react-redux

```js

withPromises([
{
  promise: (props) => props.getEvents({organization: props.params.organizationId}, false),
  shouldUpdate: (props, nextProps) => props.params.organizationId != nextProps.params.organizationId
}, 
{
  promise: (props) => props.getOrganization(props.params.organizationId), // in this case we call a redux action creator which returns a promise and makes a fetch request
  shouldUpdate: (props, nextProps) => props.params.organizationId != nextProps.params.organizationId, // under which conditions should this promise be invoked again?
  key: 'organization' // optionally pass in prop to AppPage when promise resolves with a value
}
])(AppPage);

```


## Some Types
```js
type option = {
  promise: Promise,
  shouldUpdate: (props, nextProps) => boolean,
  key: string
}

withPromises: Array<option> => Component => Component
```
#### default Values: 
```js
shouldUpdate: () => false
key: undefined
```

