import Ember from "ember";

var controller = Ember.ObjectController.extend({
    needs: ['application'],
    actions: {
        'save': function() {
            var self = this;
            var application = self.get('controllers.application');
            var model = this.get('model');
            var annotations = model.get('annotations');
            var field = $("#new_annotation_body");
            var form = $("#new_annotation_form");
            var value = field.val();

            if (annotations === null) {
                annotations = [];
            }
            if (!value) {
                // If they didn't enter any text into the annotation
                // form, just close the dialog and go about your day.
                form.foundation('reveal', 'close');
                return;
            }

            annotations.pushObject(value);
            model.set('annotations', annotations);
            application.showLoading();
            model.save().then(function(){
                application.hideLoading();
                field.val('');
                form.foundation('reveal', 'close');
            }, function(msg) {
                model.rollback();
                model.reload();
                application.hideLoading();
                application.error_message(
                    "An error was encountered while " +
                    "saving this annotation.  Check your " +
                    "Activity Log for more information."
                );
            });
        }
    }
});

export default controller;
