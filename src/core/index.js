export * from './ValidationError';
export * from './Issue';
export * from './wsBroadcast';

export const idGenerator = (() => {
    let id = 0;
    return {
        next: () => ++id
    }
}) ();

export const jwtConfig = { secret: 'my-secret' };
