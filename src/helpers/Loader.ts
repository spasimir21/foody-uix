import { Effect, State } from '@uixjs/reactivity';

type LoadedCallback<TLoadResult> = (result: TLoadResult) => void;

class Loader<TLoadInput, TLoadResult> {
  protected readonly loadedListeners = new Set<LoadedCallback<TLoadResult>>();
  protected lastLoadId: number = -1;

  @State
  loading: boolean = false;
  @State
  hasHadFirstLoad: boolean = false;

  protected get input(): TLoadInput | null {
    return null;
  }

  onLoaded(callback: LoadedCallback<TLoadResult>) {
    this.loadedListeners.add(callback);
  }

  removeLoadedListener(callback: LoadedCallback<TLoadResult>) {
    this.loadedListeners.delete(callback);
  }

  protected async load(input: TLoadInput, isAborted: () => boolean): Promise<TLoadResult | null> {
    return null as any;
  }

  protected onResult(result: TLoadResult): void {}

  async startLoad(input: TLoadInput) {
    this.loading = true;
    const loadId = ++this.lastLoadId;

    const result = await this.load(input, () => this.lastLoadId !== loadId);
    if (result == null) return;

    if (this.lastLoadId !== loadId) return;
    this.hasHadFirstLoad = true;
    this.loading = false;

    this.onResult(result);
    for (const callback of this.loadedListeners) callback(result);
  }

  @Effect
  private onInputChanged() {
    const input = this.input;
    if (input == null) return;

    setTimeout(() => this.startLoad(input), 0);
  }
}

export { Loader };
