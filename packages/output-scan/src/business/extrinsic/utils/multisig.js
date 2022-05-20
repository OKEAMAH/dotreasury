const { WrappedEvents } = require("../../../utils/wrappedEvents");
const { Modules, MultisigEvents } = require("../../common/constants");

function getMultisigInnerCallEvents(wrappedEvents) {
  const source = (wrappedEvents?.events || []);
  const index = source.findIndex(
    ({ event }) => event?.method === MultisigEvents.MultisigExecuted
  )

  let events = source.slice(0, index);
  if (index < 0) {
    events = source;
  }

  return new WrappedEvents(
    events,
    wrappedEvents.offset,
    index >= 0 ? true : wrappedEvents.wrapped
  );
}

function isMultisigExecutedOk(events = []) {
  const event = events.find(({ event }) =>
    event.section === Modules.Multisig && MultisigEvents.MultisigExecuted === event.method
  );

  if (!event) {
    return false
  }

  const resultArgIndex = event.event.meta.args.findIndex(arg => arg.toString() === 'DispatchResult')
  return event.event?.data[resultArgIndex].isOk;
}

module.exports = {
  getMultisigInnerCallEvents,
  isMultisigExecutedOk,
}
