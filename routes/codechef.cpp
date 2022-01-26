/*LifE BEGINS AT THE END OF YOUR COMFORT ZONE*/
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define pi (3.141592653589)
#define mod 1000000007
#define int long long
#define float double
#define pb push_back
#define mp make_pair
#define ff first
#define ss second
#define all(c) c.begin(), c.end()
#define min3(a, b, c) min(c, min(a, b))
#define min4(a, b, c, d) min(d, min(c, min(a, b)))
#define rrep(i, n) for(int i=n-1;i>=0;i--)
#define rep(i,n) for(int i=0;i<n;i++)
#define fast ios_base::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);


bool isPrime(int n){
    if(n==1) return false;
    if(n==2) return true;
    for(int i=2;i*i<=n;i++){
        if(n%i==0)return false;
    }
    return true;
}

void solve(){
    int a,b,c;
    cin>>a>>b>>c;
    int mx = max(a,max(b,c));
    int mn = min3(a,b,c);

    int m = a+b+c-mx-mn;
    if(m==mx){
        cout<<mx-a+1<<" "<<mx-b+1<<" "<<mx-c+1<<endl;
        return;
    }
    if(mx == a){
        cout<<0<<" "<<mx-b+1<<" "<<mx-c+1<<endl;
    }else if(mx==b){
        cout<<mx-a+1<<" "<<0<<" "<<mx-c+1<<endl;
    }else{
        cout<<mx-a+1<<" "<<mx-b+1<<" "<<0<<endl;
    }
}

int32_t main(){
fast


// Fuck Ratings, I'm in Love with Experience.
// Once a Charas, Always a CHARAS.


int t=1;
cin>>t;
while(t--){
    solve();
}
return 0;
}
