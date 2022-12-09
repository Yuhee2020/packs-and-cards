import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const getScroll = (
    refCurrent: OverlayScrollbarsComponent,
): { scrollPosition: number; overflowAmount: number } => {
    return {
        scrollPosition: refCurrent.osInstance()?.scroll().position.y!,
        overflowAmount: refCurrent.osInstance()?.getState('overflowAmount.y'),
    };
};