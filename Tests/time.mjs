import moment from "moment";

const date = "2022-12-15T10:20:19.000Z";
const ndate = new Date(date);
console.log(ndate);

const clog = (d) => console.log(d, d.fromNow());

// I need to get the fromNow of the date from my local timezone

clog(moment());

clog(moment(ndate));
clog(moment(date).local());
clog(moment(date));
console.log(new Date().getTimezoneOffset());
