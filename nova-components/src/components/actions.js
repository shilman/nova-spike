import { Meteor } from 'nova-core'

const Actions = {}

console.log("Meteor", Meteor);
Actions.call = Meteor.call;

export default Actions;
