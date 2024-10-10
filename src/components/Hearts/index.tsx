import React, { ReactNode } from "react";
import "./styles.scss";

type Props = {
    maxLives: number;
    lives: number;
};

export function Hearts(props: Props) {
    const heart = () => <i className="nes-icon heart"></i>;

    const halfHeart = () => (
        <i className="nes-icon is-half heart heart-icon"></i>
    );

    const emptyHeart = () => (
        <i className="nes-icon is-empty heart heart-icon"></i>
    );

    const obtainHearts = () => {
        const hearts: Array<ReactNode> = [];
        const wholeHearts: number = Math.floor(props.lives / 2);
        const halfHearts: number = props.lives % 2;
        const emptyHearts: number = Math.floor(
            (props.maxLives - props.lives) / 2
        );

        Array.from(Array(wholeHearts)).forEach((_) => hearts.push(heart()));
        Array.from(Array(halfHearts)).forEach((_) => hearts.push(halfHeart()));
        Array.from(Array(emptyHearts)).forEach((_) =>
            hearts.push(emptyHeart())
        );
        return hearts;
    };

    return <div>{obtainHearts()}</div>;
}
