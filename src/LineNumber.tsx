import React, {FunctionComponent} from 'react';

type LineNumberProps = {
    number: string;
}

export const LineNumber = ({number}: LineNumberProps) => <div>{number}</div>