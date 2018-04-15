/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class WaterfallModal extends Controller {
    constructor($scope, $uibModalInstance, selectedBuild) {
        {
          super();
          let thisFn = (() => { return this; }).toString();
          let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
          eval(`${thisName} = this;`);
        }
        this.$uibModalInstance = $uibModalInstance;
        this.selectedBuild = selectedBuild;
        $scope.$on('$stateChangeStart', () => {
            return this.close();
        });
    }

    close() {
        return this.$uibModalInstance.close();
    }
}
