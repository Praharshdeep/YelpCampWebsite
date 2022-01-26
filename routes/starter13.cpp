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

vector<int> primeFact(int n){
    vector<int> pfact;
    while(n%2==0){
        pfact.pb(2);
        n/=2;
    }
    int i;
    for(i=3;i*i<=n;i+=2){
        while(n%i==0){
            pfact.pb(i);
            n/=i;
        }
    }
    if(n>2){
        pfact.pb(n);
    }
    return pfact;
}

int32_t main(){
fast


// Fuck Ratings, I'm in Love with Experience.
// Once a Charas, Always a CHARAS.


int t=1;
cin>>t;
while(t--){
    int a,b;
    cin>>a>>b;
    int flag = 1;
    vector<int> fact = primeFact(a);
    for(int i=0;i<fact.size();i++){
        if(b%fact[i]!=0){
            flag = 0;
            break;
        }
    }
    if(flag==0) cout<<"NO"<<endl;
    else cout<<"YES"<<endl;

}
return 0;
}
