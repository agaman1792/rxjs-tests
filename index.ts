import { Subject, ReplaySubject } from 'rxjs';
import { groupBy, concatAll } from 'rxjs/operators';

const DataStream: Subject<{ id, data: string }> = new Subject();

const data = [
    { id: 0, data: 'first' },
    { id: 1, data: 'first' },
    { id: 1, data: 'second' },
    { id: 1, data: 'third' },
    { id: 0, data: 'second' },
    { id: 1, data: 'fourth' },
    { id: 2, data: 'first' },
    { id: 2, data: 'second' },
    { id: 3, data: 'first' },
    { id: 2, data: 'third' },
    { id: 4, data: 'first' },
    { id: 3, data: 'second' },
    { id: 3, data: 'third' },
    { id: 1, data: 'fifth' },
    { id: 0, data: 'third' },
    { id: 4, data: 'second' },
];

DataStream.pipe(
    groupBy(item => item.id, null, null, () => new ReplaySubject()),
    concatAll()
).subscribe(item => console.log(item));

data.forEach(item => DataStream.next(item));
DataStream.complete();