module meme_coin_generator::meme_coin_generator {
    use std::string::{Self, String};
    use std::vector;
    use std::signer;
    use std::option::{Self, Option};
    use aptos_framework::timestamp;

    /// Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINVALID_NAME: u64 = 2;
    const EINVALID_SYMBOL: u64 = 3;
    const EINVALID_DESCRIPTION: u64 = 4;
    const EINVALID_TOTAL_SUPPLY: u64 = 5;
    const EINVALID_DISTRIBUTION: u64 = 6;
    const ECOIN_ALREADY_EXISTS: u64 = 7;
    const EINSUFFICIENT_BALANCE: u64 = 8;

    /// Struct representing a meme coin
    struct MemeCoin has key, store, copy, drop {
        name: String,
        symbol: String,
        description: String,
        total_supply: u64,
        created_at: u64,
        creator: address,
        tokenomics: Tokenomics,
        coin_type: address,
    }

    /// Struct representing tokenomics distribution
    struct Tokenomics has store, drop, copy {
        liquidity_pool: u64,      // 40% - for liquidity
        community_rewards: u64,   // 25% - for community
        team_tokens: u64,         // 15% - for team
        marketing: u64,           // 10% - for marketing
        development: u64,         // 10% - for development
    }

    /// Struct for storing coin metadata
    struct CoinMetadata has key {
        coins: vector<MemeCoin>,
    }

    /// Struct for storing user's generated coins
    struct UserCoins has key {
        coins: vector<address>,
    }

    /// Struct for storing coin statistics
    struct CoinStats has key {
        total_coins_generated: u64,
        total_volume: u64,
        active_coins: u64,
    }

    /// Initialize the module
    fun init_module(account: &signer) {
        // Initialize global stats
        move_to(account, CoinStats {
            total_coins_generated: 0,
            total_volume: 0,
            active_coins: 0,
        });

        // Initialize coin metadata storage
        move_to(account, CoinMetadata {
            coins: vector::empty(),
        });
    }

    /// Generate a new meme coin with automated tokenomics
    public entry fun generate_meme_coin(
        account: &signer,
        name: String,
        symbol: String,
        description: String,
        total_supply: u64,
    ) acquires CoinMetadata, CoinStats, UserCoins {
        // Validate inputs
        assert!(string::length(&name) > 0, EINVALID_NAME);
        assert!(string::length(&symbol) > 0, EINVALID_SYMBOL);
        assert!(string::length(&description) > 0, EINVALID_DESCRIPTION);
        assert!(total_supply > 0, EINVALID_TOTAL_SUPPLY);

        let creator = signer::address_of(account);
        let current_time = timestamp::now_seconds();

        // Generate automated tokenomics
        let tokenomics = generate_tokenomics(total_supply);

        // Create the meme coin
        let meme_coin = MemeCoin {
            name,
            symbol,
            description,
            total_supply,
            created_at: current_time,
            creator,
            tokenomics,
            coin_type: creator, // Will be updated when coin is deployed
        };

        // Store the coin
        let coin_metadata = borrow_global_mut<CoinMetadata>(@meme_coin_generator);
        vector::push_back(&mut coin_metadata.coins, meme_coin);

        // Update user's coin list
        if (!exists<UserCoins>(creator)) {
            move_to(account, UserCoins {
                coins: vector::empty(),
            });
        };
        let user_coins = borrow_global_mut<UserCoins>(creator);
        vector::push_back(&mut user_coins.coins, creator);

        // Update global stats
        let stats = borrow_global_mut<CoinStats>(@meme_coin_generator);
        stats.total_coins_generated = stats.total_coins_generated + 1;
        stats.active_coins = stats.active_coins + 1;
    }

    /// Generate automated tokenomics based on total supply
    fun generate_tokenomics(total_supply: u64): Tokenomics {
        let liquidity_pool = (total_supply * 40) / 100;
        let community_rewards = (total_supply * 25) / 100;
        let team_tokens = (total_supply * 15) / 100;
        let marketing = (total_supply * 10) / 100;
        let development = (total_supply * 10) / 100;

        Tokenomics {
            liquidity_pool,
            community_rewards,
            team_tokens,
            marketing,
            development,
        }
    }

    /// Get all generated coins
    public fun get_all_coins(): vector<MemeCoin> acquires CoinMetadata {
        let coin_metadata = borrow_global<CoinMetadata>(@meme_coin_generator);
        *&coin_metadata.coins
    }

    /// Get user's generated coins
    public fun get_user_coins(user_addr: address): vector<address> acquires UserCoins {
        if (exists<UserCoins>(user_addr)) {
            let user_coins = borrow_global<UserCoins>(user_addr);
            *&user_coins.coins
        } else {
            vector::empty()
        }
    }

    /// Get coin statistics
    public fun get_coin_stats(): (u64, u64, u64) acquires CoinStats {
        let stats = borrow_global<CoinStats>(@meme_coin_generator);
        (stats.total_coins_generated, stats.total_volume, stats.active_coins)
    }

    /// Get tokenomics for a specific coin
    public fun get_coin_tokenomics(coin_name: String): Option<Tokenomics> acquires CoinMetadata {
        let coin_metadata = borrow_global<CoinMetadata>(@meme_coin_generator);
        let i = 0;
        let len = vector::length(&coin_metadata.coins);
        while (i < len) {
            let coin = vector::borrow(&coin_metadata.coins, i);
            if (coin.name == coin_name) {
                return option::some(coin.tokenomics)
            };
            i = i + 1;
        };
        option::none()
    }

    /// Update coin description (only creator can update)
    public entry fun update_coin_description(
        account: &signer,
        coin_name: String,
        new_description: String,
    ) acquires CoinMetadata {
        let creator = signer::address_of(account);
        assert!(string::length(&new_description) > 0, EINVALID_DESCRIPTION);

        let coin_metadata = borrow_global_mut<CoinMetadata>(@meme_coin_generator);
        let i = 0;
        let len = vector::length(&coin_metadata.coins);
        while (i < len) {
            let coin = vector::borrow_mut(&mut coin_metadata.coins, i);
            if (coin.creator == creator && coin.name == coin_name) {
                coin.description = new_description;
                break
            };
            i = i + 1;
        };
    }

    /// Delete a coin (only creator can delete)
    public entry fun delete_coin(
        account: &signer,
        coin_name: String,
    ) acquires CoinMetadata, CoinStats {
        let creator = signer::address_of(account);
        
        let coin_metadata = borrow_global_mut<CoinMetadata>(@meme_coin_generator);
        let i = 0;
        let len = vector::length(&coin_metadata.coins);
        while (i < len) {
            let coin = vector::borrow(&coin_metadata.coins, i);
            if (coin.creator == creator && coin.name == coin_name) {
                // Remove coin from metadata
                vector::remove(&mut coin_metadata.coins, i);
                
                // Update stats
                let stats = borrow_global_mut<CoinStats>(@meme_coin_generator);
                stats.active_coins = stats.active_coins - 1;
                break
            };
            i = i + 1;
        };
    }
} 