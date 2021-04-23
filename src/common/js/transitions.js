import { loadImages, nGetBody } from './helpers';
import { commonComponents } from './commonComponents';

const defaultTransition = (transition) => {
    // if (nGetBody()
    //     .classList
    //     .contains('sandwich-open')) {
    //     commonComponents.sandwichMenu.sandwichMenuClose.close(false);
    // }
    commonComponents.header.addContrastClass();

    commonComponents.preloader.lazyLoad.update();
    // loadImages();
    new TimelineLite()
        .to(
            transition.oldContainer,
            0.5,
            {
                autoAlpha: 0,
                onComplete: () => {
                    commonComponents.callbacks.call('beforeOldContainerRemove');
                    transition.done.bind(transition)();
                },
            },
        )
        .fromTo(transition.newContainer, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 });
};

const transitions = {};

const namespaceSubstitute = {};

export default (source, target) => (transitions[source] && transitions[source][target])
    || (transitions[source] && transitions[source][namespaceSubstitute[target]])
    || (transitions[namespaceSubstitute[source]] && transitions[namespaceSubstitute[source]][target])
    || (
        transitions[namespaceSubstitute[source]]
        && transitions[namespaceSubstitute[source]][namespaceSubstitute[target]])
    || defaultTransition;
