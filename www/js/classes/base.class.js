let objectMemory = [];


class Base {

    constructor() {

        this.setupEventHandling();

        objectMemory.push(this);
    }

    html(templateNo = '') {
        let method = 'template' + templateNo;
        if (!this[method]) {
            return;
        }
        let rendered = $(this[method]());

        rendered.attr('object-id', objectMemory.indexOf(this));

        return rendered.get(0).outerHTML;
    }


    render(selector, templateNo = '') {
        let rendered = this.html(templateNo);

        if (!selector) {
            let myId = objectMemory.indexOf(this);
            $(`[object-id=${myId}]`).replaceWith(rendered);
        } else {

            $(selector).html(rendered);
        }
    }


    setupEventHandling() {

        let lastEvent;
        if (objectMemory.length === 0) {
            $(document).on(

                'click keyup mouseenter mouseleave change',
                '*',
                function(e) {

                    if (lastEvent === e) {
                        return;
                    }
                    lastEvent = e;

                    let me = $(e.target);

                    let objectInstances = [];
                    let instancesByType = {};
                    let elements = me.parents('[object-id]');
                    if (me.attr('object-id')) {
                        elements = elements.add(me);
                    }
                    for (let el of elements) {
                        el = $(el);
                        let objectId = el.attr('object-id') / 1;
                        let object = objectMemory[objectId];
                        let type = object.constructor.name;
                        if (instancesByType[type]) {
                            let co = 2;
                            while (instancesByType[type + co]) {
                                co++;
                            }
                            type += co;
                        }
                        instancesByType[type] = object;
                        objectInstances.push(object);

                    }
                    for (let objectInstance of objectInstances) {

                        if (objectInstance && objectInstance[e.type]) {
                            objectInstance[e.type](me, instancesByType, e);
                        }
                    }
                }
            );
        }
    }

}