import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  mergeMap,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs';
import {
  map,
  combineLatestWith,
  tap,
  switchMap,
  delay,
  catchError,
} from 'rxjs/operators';

const oppo = of(1); // timer(3000,3000)
const facility = of(2);

class Bonjour {
  public aurevoir$ = new Subject();

  bl() {
    return of(5000);
  }
}

const bonjour: Bonjour = new Bonjour();

class Aurevoir {
  public bonjour$;

  constructor() {
    this.bonjour$ = bonjour.aurevoir$;
  }
}

const aurevoir: Aurevoir = new Aurevoir();
/*
aurevoir.bonjour$.subscribe((data) => console.log(data));
bonjour.aurevoir$.next('bonjour');

bonjour
  .bl()
  .pipe(
    combineLatestWith(facility, oppo),
    map(([oppo, facility, bonjour]: [number, number, number]) => {
      console.log(oppo, facility, bonjour);
    })
  )
  .subscribe();

bonjour
  .bl()
  .pipe(tap(() => console.log(4)))
  .subscribe();
*/

// Outer observable emitting a value
const outerObservable = of('UserID');

// Simulated inner observables
const getUserInfo = (userId: string) =>
  of(`User Info for ${userId}`).pipe(
    delay(1000),
    tap(() => {
      throw Error('bonjour');
    })
  );
const getUserPosts = (userId: string) =>
  of(`User Posts for ${userId}`).pipe(delay(500));

/*
outerObservable
  .pipe(
    mergeMap(() => {
      // Returning two inner observables in parallel
      return forkJoin([getUserInfo('561'), getUserPosts('780')]);
    })
  )
  .subscribe({
    next: (result) => {
      console.log('Result:', result);
    },
    error: (error) => {
      console.log(error.message);
    },
  });
*/

/*
outerObservable
  .pipe(
    switchMap((res) =>
      of(res + ' 461').pipe(
        tap(() => {
          throw Error('aurevoir');
        }),
        catchError((err) => {
          throw err;
        })
      )
    ),
    switchMap((res) =>
      of(res + ' 561').pipe(
        tap(() => {
          throw Error('bonjour');
        }),
        catchError((err) => of(err))
      )
    )
  )
  .subscribe({
    next: (result) => {
      console.log('Result:', result);
    },
    error: (error) => {
      console.log(error.message);
    },
  });
*/

outerObservable
  .pipe(
    mergeMap((res) => of(res + ' 461')),
    mergeMap((res) => of(res + ' 561'))
  )
  .subscribe({
    next: (result) => {
      console.log('Result:', result);
    },
  });
